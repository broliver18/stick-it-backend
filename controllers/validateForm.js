module.exports.validateForm = (formSchema) => {
  return (req, res, next) => {
    const formData = req.body;
    formSchema
      .validate(formData)
      .catch((error) => {
        res.status(422).send();
        console.log(error.errors);
        console.log(formData);
      })
      .then((valid) => {
        if (valid) {
          console.log("Form succesfully submitted");
          next();
        } else {
          res.status(422).send();
        }
      });
  };
}
