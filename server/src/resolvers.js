import { v4 as uuidv4 } from 'uuid';
import find from 'lodash.find'
import remove from 'lodash.remove'
import { gql } from 'apollo-server-express';


const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }

  type Query {
    people: [Person]
    person(id: ID!): Person
    cars: [Car]
    car(id: ID!): Car
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    deletePerson(id: ID!): Person
    addCar(year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car
    updateCar(id: ID!, year: Int, make: String, model: String, price: Float, personId: ID): Car
    deleteCar(id: ID!): Car
  }
`;

const resolvers = {
  Query: {
    people: () => people,
    person: (root, args) => find(people, { id: args.id }),
    cars: () => cars,
    car: (root, args) => find(cars, { id: args.id }),
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = { id: uuidv4(), firstName: args.firstName, lastName: args.lastName };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`);
      person.firstName = args.firstName || person.firstName;
      person.lastName = args.lastName || person.lastName;
      return person;
    },
    deletePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`);
      remove(people, p => p.id === args.id);
      remove(cars, c => c.personId === args.id); // Also remove the person's cars
      return person;
    },
    addCar: (root, args) => {
      const newCar = { id: uuidv4(), year: args.year, make: args.make, model: args.model, price: args.price, personId: args.personId };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id ${args.id}`);
      car.year = args.year || car.year;
      car.make = args.make || car.make;
      car.model = args.model || car.model;
      car.price = args.price || car.price;
      car.personId = args.personId || car.personId;
      return car;
    },
    deleteCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id ${args.id}`);
      remove(cars, c => c.id === args.id);
      return car;
    }
  },
  Person: {
    cars: (parent) => cars.filter(car => car.personId === parent.id)
  }
};

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

export {resolvers, typeDefs};
