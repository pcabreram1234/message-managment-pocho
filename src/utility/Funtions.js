import { submitData } from "../utility/submitData";

const saveDataFuntion = (API_URL, data, cb) => {
  submitData(API_URL, data).then((resp) => {
    if (typeof resp.result === "number" || resp.result === 1) {
      cb("Guardando Registro(s)", "success", "Registro(s) Guardado(s)");
      reloadPage();
    } else {
      cb("Guardando Registro(s)", "error", resp.message);
    }
  });
};

const deleteDataFuntion = (API_URL, data, cb) => {
  submitData(API_URL, data, "DELETE").then((resp) => {
    if (typeof resp.result === "number" || resp.result === 1) {
      cb("Eliminando Registro(s)", "Registro(s) Eliminado(s)", "success");
      reloadPage();
    } else {
      alert(resp.message);
      cb("Ha ocurrido un error", "error", resp.message);
    }
  });
};

const editDataFuntion = (API_URL, data, cb) => {
  submitData(API_URL, data, "PATCH").then((resp) => {
    setTimeout(() => {
      if (typeof resp.result === "number" || resp.result === 1) {
        cb("Editando Registro(s)", "success", "Registro Editado");
        reloadPage();
      } else {
        alert(resp.message);
        cb("Editando Registro(s)", "error", resp.message);
      }
    }, 500);
  });
};

const reloadPage = () => {
  setTimeout(() => {
    window.location.href = "";
  }, 500);
};

/* Funcion que elimina los elementos duplicados de un array de numeros */
const deleteDuplicateInFilter = (data) => {
  let uniqueArray = [];

  data.forEach((item) => {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
};

/* Funcion que recorre un objeto y retorna el valor de la propiedad seleccionada */
const getObjectProp = (data, property) => {
  let props = [];
  for (const key in data) {
    if (data[key].hasOwnProperty(property)) {
      const addToProps = data[key][property];
      props.push(addToProps);
    }
  }
  return props;
};

/* Funcion que valida si todos los campos estan marcados como obligatorios
de un formulario, en esta funcion se usa el hook de validateForm de la libreria
de AntDesign */
function validateForm(form, cb, cbErrorHandle) {
  form
    .validateFields()
    .then((values) => {
      cb();
      /* Como cbErrorhandle es un hook que actualiza el estado
      para evitar el renderizado infinito dentro de la promesa
      colocamos un setTimeout para que se ejecute una sola vez */
      setTimeout(() => {
        cbErrorHandle(true);
      }, 500);
    })
    .catch((errorInfo) => {
      setTimeout(() => {
        cbErrorHandle(false);
      }, 500);
    });
}

function validateFormWithOutCb(form) {
  form.validateFields().then((field) => {
    if (field.errorFields.length > 0) {
      let err = [];
      for (let i = 0; i < field.errorFields.length; i++) {
        err.push(field.errorFields[i].errors[i]);
      }
      alert(err);
      return;
    }
  });
}

const getRandomColors = () => {
  let makingColorCode = "0123456789ABCDEF";
  let finalCode = "#";
  for (let i = 0; i < 6; i++) {
    finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
  }
  return finalCode;
};

const filterTableInput = (value, dataSource) => {
  let result = [];
  for (let i = 0; i < dataSource.length; i++) {
    if (
      dataSource[i].message.toLowerCase().indexOf(value) !== -1 ||
      dataSource[i].message.indexOf(value) !== -1
    ) {
      result.push(dataSource[i]);
    }
  }
  return value.length > 0 || value ? dataSource : result;
};

const renderMessages = (
  messages,

  { dataSource, categoriesTmpFilter, categoriesFilter }
) => {
  let sendToTmpFilter = [];
  let sendOnDateTmpFilter = [];
  if (messages.result) {
    messages.result.rows.map((message) => {
      dataSource.push({
        key: message.id,
        message: message.message,
        categories: getObjectProp(message.categories, "categorie_name"),
        send_to: message.send_to,
        status: message.message_status,
        send_on_date: new Date(message.send_on_date).toLocaleDateString(),
        send_on_time: new Date(message.send_on_date).toLocaleTimeString(),
      });

      /* En dado caso que el mensaje tenga categorias asociadas
       agregar a la variable de filtros temporal*/
      if (message.categories.length > 0) {
        for (const cC of message.categories) {
          categoriesTmpFilter.push(cC.categorie_name);
        }
      }
      sendToTmpFilter.push(message.send_to);
      sendOnDateTmpFilter.push(message.send_on_date);
    });
  }
  /* Las variables de filtros temporales se les reasigna su valor en base a la 
  funcion que elimina los duplicados */
  categoriesTmpFilter = deleteDuplicateInFilter(categoriesTmpFilter);

  /* Se recorre las dos variables de filtros temporales para que 
  en cada recorrido le agregue las propiedades del objeto que necesita
  la UI para mostrar las opciones de los filtros */
  categoriesTmpFilter.map((category) => {
    categoriesFilter.push({ text: category, value: category });
  });

  return dataSource;
};

const compareDates = (inputDate, currentDate) => {
  const dateInServer = new Date(currentDate).getTime();
  const dateSelected = new Date(inputDate).getTime();
  /* Convierte la diferencia de los milisegundos a segundos, luego a minutos y despues a dias */
  const diferenceDate = Math.ceil(
    (dateInServer - dateSelected) / (1000 * 3600 * 24)
  );
  console.log(diferenceDate);
  return diferenceDate;
};

const hidePopUp = (cb) => {
  setTimeout(() => {
    cb(false);
  }, 1300);
};

const showPopUp = (cb) => {
  cb(true);
};

export {
  saveDataFuntion,
  deleteDataFuntion,
  editDataFuntion,
  reloadPage,
  deleteDuplicateInFilter,
  getObjectProp,
  validateForm,
  getRandomColors,
  filterTableInput,
  renderMessages,
  compareDates,
  hidePopUp,
  showPopUp,
  validateFormWithOutCb,
};
