const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let cars = [
  {
    name: "auto1",
    model: "model1",
    year: "2021",
    color: "red",
    id: 1,
  },
  {
    name: "auto2",
    model: "model2",
    year: "2020",
    color: "blue",
    id: 2,
  },
  {
    name: "auto3",
    model: "model3",
    year: "2019",
    color: "green",
    id: 3,
  },
];

app.get("/", function (req, res) {
  let carsFilter;

  if (req.query.year) {
    carsFilter = cars.filter((car) => car.year == req.query.year);
  } else {
    carsFilter = cars;
  }

  const x = ["a", "b", "c"];
  let y = "b";

  console.log(x);
  console.log(y);

  y = "c";
  x.push("d");

  console.log(x);
  console.log(y);

  res.send({
    code: 200,
    message: "Success",
    result: carsFilter,
  });
});

app.get("/:id", function (req, res) {
  let car = cars.find((car) => car.id == req.params.id);

  if (car) {
    res.send({
      code: 200,
      message: "Success",
      result: car,
    });
  } else {
    res.status(404).send({
      code: 404,
      message: "Not Found",
    });
  }
});

app.post("/", function (req, res) {
  let car = {
    name: req.body.name,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    id: cars.length + 1,
  };

  cars.push(car);

  res.send({
    code: 200,
    message: "Success",
    result: car,
  });
});

app.put("/:id", function (req, res) {
  let car = cars.find((car) => car.id == req.params.id);

  if (car) {
    car.name = req.body.name;
    car.model = req.body.model;
    car.year = req.body.year;
    car.color = req.body.color;

    res.send({
      code: 200,
      message: "Success",
      result: car,
    });
  } else {
    res.status(404).send({
      code: 404,
      message: "Not Found",
    });
  }
});

app.delete("/", function (req, res) {
  cars = [];

  res.send({
    code: 200,
    message: "Success",
  });
});

app.delete("/:id", function (req, res) {
  let car = cars.find((car) => car.id == req.params.id);

  if (car) {
    cars = cars.filter((car) => car.id != req.params.id);

    res.send({
      code: 200,
      message: "Success",
    });
  } else {
    res.status(404).send({
      code: 404,
      message: "Not Found",
    });
  }
});

var server = app.listen(3000, function () {
  console.log("start");
});
