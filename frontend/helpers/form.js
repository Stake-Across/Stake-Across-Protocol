const onChange = (events) => {
  // Copia para modificar los valores del formulario.
  const clone = JSON.parse(JSON.stringify(userData));
  events.forEach((e) => {
    const { name, value, id } = e.target;
    const depth = name.split(".").length;

    switch (depth) {
      case 1:
        clone[page > 1 ? 1 : page][name.split(".")[0]] = value;
        break;
      case 2:
        clone[page > 1 ? 1 : page][name.split(".")[0]][name.split(".")[1]] =
          value;
        break;
      case 3:
        if (name.split(".")[0] === "referrals") {
          const index = name.split(".")[1];
          clone[page > 1 ? 1 : page][name.split(".")[0]][name.split(".")[1]][
            name.split(".")[2]
          ] = value;
        } else {
          clone[page > 1 ? 1 : page][name.split(".")[0]][name.split(".")[1]][
            name.split(".")[2]
          ] = value;
        }
        break;
      case 4:
        clone[page > 1 ? 1 : page][name.split(".")[0]][name.split(".")[1]][
          name.split(".")[2]
        ][name.split(".")[3]] = value;
        break;
      case 5:
        clone[page > 1 ? 1 : page][name.split(".")[0]][name.split(".")[1]][
          name.split(".")[2]
        ][name.split(".")[3]][name.split(".")[4]] = value;
        break;
    }

    setErrors((prevState) => ({
      ...prevState,
      [`${name.split(".")[depth - 2]}.${name.split(".")[depth - 1]}`]:
        validators[name.split(".")[depth - 1]] &&
        validators[name.split(".")[depth - 1]](value),
    }));
  });

  return setuserData(clone);
};

const onBlur = (event) => {
  const { name } = event.target;
  setTouched((prevTouched) => ({
    ...prevTouched,
    [name]: true,
  }));
};

const onFocus = (event) => {
  const { name } = event.target;
  setTouched((prevTouched) => ({
    ...prevTouched,
    [name]: false,
  }));
};

 const pageBack = (e) => {
   const id = e.target.name;
   setPage(id);
 };

 const pageForward = async (e) => {
   const id = e.target.name;
   const res = validateData(id, userData);
   if (!res?.value) {
     setMissing(true);
   } else if (isValid()) {
     setPage(res.page ? res.page : id);
   }
 };
