import { useState, useEffect, useMemo } from "react";
import boteImg from "/images/bote.png";
import "../App.css";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("names")) {
        const namesStore = db.createObjectStore("names", {
          keyPath: "id",
          autoIncrement: true,
        });
        namesStore.createIndex("name", "name", { unique: false });
      }

      if (!db.objectStoreNames.contains("tableData")) {
        const tableStore = db.createObjectStore("tableData", {
          keyPath: "week",
        });
        tableStore.createIndex("data", "data", { unique: false });
        tableStore.createIndex("startDate", "startDate", { unique: false });
        tableStore.createIndex("endDate", "endDate", { unique: false });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const App = () => {
  const [editableNames, setEditableNames] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    () => Number(localStorage.getItem("selectedMonth")) || 1
  );
  const [selectedYear, setSelectedYear] = useState(
    () =>
      Number(localStorage.getItem("selectedYear")) || new Date().getFullYear()
  );
  const [weeksData, setWeeksData] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(""))
  );

  const positions = useMemo(
    () => ["Semana", "Guardían", "Vig1ro", "Vig2do", "Ofi. Cer", "Acolito"],
    []
  );

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction("names", "readonly");
        const objectStore = transaction.objectStore("names");
        const request = objectStore.getAll();
        request.onsuccess = () =>
          setEditableNames(request.result.map((item) => item.name));
        request.onerror = () =>
          console.error("Error fetching names:", request.error);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    const loadWeeksData = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction("tableData", "readonly");
        const objectStore = transaction.objectStore("tableData");
        const newWeeksData = Array(5)
          .fill(null)
          .map(() => Array(5).fill(""));

        for (let weekNumber = 1; weekNumber <= 5; weekNumber++) {
          const request = objectStore.get(weekNumber);
          request.onsuccess = () => {
            newWeeksData[weekNumber - 1] = request.result
              ? request.result.data
              : Array(5).fill("");
            if (weekNumber === 5) {
              setWeeksData(newWeeksData);
            }
          };
          request.onerror = () =>
            console.error("Error loading week data:", request.error);
        }

        const monthRequest = objectStore.get(0);
        monthRequest.onsuccess = () => {
          if (monthRequest.result) {
            console.log("Fechas del mes:", monthRequest.result);
          }
        };
        monthRequest.onerror = () =>
          console.error("Error loading month dates:", monthRequest.error);
      } catch (error) {
        console.error("Error loading weeks data:", error);
      }
    };

    fetchNames();
    loadWeeksData();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase().replace(/[^A-Z\s]/g, "");
    setInputValue(value);
  };

  const addName = async () => {
    if (inputValue.trim()) {
      try {
        const db = await openDB();
        const transaction = db.transaction("names", "readwrite");
        const objectStore = transaction.objectStore("names");
        objectStore.add({ name: inputValue.trim() });
        transaction.oncomplete = () => {
          setEditableNames((prevNames) => [...prevNames, inputValue.trim()]);
          setInputValue("");
        };
        transaction.onerror = () =>
          console.error("Error adding name:", transaction.error);
      } catch (error) {
        console.error("Error adding name:", error);
      }
    }
  };

  const removeName = async (index) => {
    try {
      const db = await openDB();
      const transaction = db.transaction("names", "readwrite");
      const objectStore = transaction.objectStore("names");
      const allNames = await new Promise((resolve) => {
        const request = objectStore.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () =>
          console.error("Error fetching all names:", request.error);
      });
      const idToDelete = allNames[index].id;
      objectStore.delete(idToDelete);
      transaction.oncomplete = () => {
        setEditableNames((prevNames) =>
          prevNames.filter((_, i) => i !== index)
        );
      };
      transaction.onerror = () =>
        console.error("Error removing name:", transaction.error);
    } catch (error) {
      console.error("Error removing name:", error);
    }
  };

  const handleSelectChange = (weekIndex, posIndex, event) => {
    const newWeeksData = [...weeksData];
    newWeeksData[weekIndex][posIndex] = event.target.value;
    setWeeksData(newWeeksData);
  };

  const saveWeeksData = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction("tableData", "readwrite");
      const objectStore = transaction.objectStore("tableData");
      for (let weekNumber = 1; weekNumber <= 5; weekNumber++) {
        const weekDates = getWeekDates(selectedYear, selectedMonth, weekNumber);
        objectStore.put({
          week: weekNumber,
          data: weeksData[weekNumber - 1],
          startDate: weekDates[0].toISOString(),
          endDate: weekDates[6].toISOString(),
        });
      }
      transaction.oncomplete = () => alert("Datos de las semanas guardados");
      transaction.onerror = () =>
        console.error("Error saving weeks data:", transaction.error);
    } catch (error) {
      console.error("Error saving weeks data:", error);
    }
  };

  const saveMonthDates = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction("tableData", "readwrite");
      const objectStore = transaction.objectStore("tableData");
      const startDate = new Date(selectedYear, selectedMonth - 1, 1);
      const endDate = new Date(selectedYear, selectedMonth, 0);

      objectStore.put({
        week: 0,
        data: [],
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      transaction.oncomplete = () => alert("Fechas del mes guardadas");
      transaction.onerror = () =>
        console.error("Error saving month dates:", transaction.error);
    } catch (error) {
      console.error("Error saving month dates:", error);
    }
  };

  const clearWeeksData = async () => {
    try {
      setWeeksData(
        Array(5)
          .fill(null)
          .map(() => Array(5).fill(""))
      );
      const db = await openDB();
      const transaction = db.transaction("tableData", "readwrite");
      const objectStore = transaction.objectStore("tableData");
      for (let weekNumber = 1; weekNumber <= 5; weekNumber++) {
        objectStore.delete(weekNumber);
      }
      transaction.oncomplete = () => alert("Datos de las semanas limpiados");
      transaction.onerror = () =>
        console.error("Error clearing weeks data:", transaction.error);
    } catch (error) {
      console.error("Error clearing weeks data:", error);
    }
  };

  const getWeekDates = (year, month, weekNumber) => {
    const dates = [];
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay() || 7; // Ajuste para considerar el domingo como el primer día de la semana
    const startDay = (weekNumber - 1) * 7 + ((1 - firstDayOfWeek + 7) % 7);

    for (let i = 0; i < 7; i++) {
      const date = new Date(year, month - 1, startDay + i);
      dates.push(date);
    }

    return dates;
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
    localStorage.setItem("selectedYear", selectedYear);
  }, [selectedMonth, selectedYear]);











  

  return (
    <div>
      <h1 className="titulo">Crear Tabla de Oficiantes</h1>

      <div>
        <input
          type="text"
          id="name-input"
          name="name"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingrese nombre y apellido"
          className="in-put"
        />
        <button className="agregar-nombre" onClick={addName}>
          Agregar
        </button>
      </div>

      <div className="group-container">
        {chunkArray(editableNames, 7).map((group, groupIndex) => (
          <div key={groupIndex} className="group-item">
            <h2>Grupo {groupIndex + 1}</h2>
            <ul className="textos-nombres">
              {group.map((name, index) => (
                <li key={index}>
                  {name}
                  <button
                    className="bote"
                    onClick={() => removeName(index + groupIndex * 7)}
                  >
                    <img src={boteImg} alt="Eliminar" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="form-container">
        <label className="ano">
          <span className="ano-label">Año:</span>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            min="2000"
            max="2100"
          />
        </label>
        <label className="mes">
          <span className="mes-label">Mes:</span>
          <input
            type="number"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            min="1"
            max="12"
          />
        </label>
      </div>
      
      
      
      
      <div className="botones-horizontales">
  
  <button className="guardar-datos-de-la-tabla" onClick={saveWeeksData}>
    Guardar Datos de las Semanas
  </button>
  <button className="guardar-fechas" onClick={saveMonthDates}>
    Guardar Fechas del Mes
  </button>
  <button className="limpiar-datos-de-la-tabla" onClick={clearWeeksData}>
    Limpiar Datos de las Semanas
  </button>
  
</div>
<div className="parent-container">
<div className="center-div">
  <input
      type="text"
      placeholder="ESCRIBE AQUÍ EL MES"
      className="entrada-texto"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
  />
</div>
</div>









      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="texto-semana">Semana</th>
              {positions.slice(1).map((position, posIndex) => (
                <th key={posIndex}>{position}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeksData.map((weekData, weekIndex) => {
              const weekDates = getWeekDates(
                selectedYear,
                selectedMonth,
                weekIndex + 1
              );
              return (
                <tr key={weekIndex}>
                  <td>
                    {weekDates[0].toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "numeric",
                    })}
                    <br />
                    al
                    <br />
                    {weekDates[6].toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "numeric",
                    })}
                  </td>
                  {weekData.map((data, posIndex) => (
                    <td key={posIndex}>
                      <select
                        className="combobox-semana" // Agrega aquí el className
                        value={data || ""}
                        onChange={(e) =>
                          handleSelectChange(weekIndex, posIndex, e)
                        }
                      >
                        <option value=""></option>
                        {editableNames.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
