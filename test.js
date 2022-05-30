// const a = 1,
//     b = "hello",
//     c = [1, 2],
//     d = { a: 2 },
//     e = () => { },
//     f = null,
//     g = undefined,
//     h = { a: 1, b: 2, c: "3" };


// const isObject = (obj) => {
//     if (!!obj && obj.constructor === Object && Object.keys(obj).length > 0) {
//         return true;
//     } else {
//         return false;
//     }
// }

// console.log(isObject(a));
// console.log(isObject(b));
// console.log(isObject(c));
// console.log(isObject(d));
// console.log(isObject(e));
// console.log(isObject(f));
// console.log(isObject(g));
// console.log(isObject(h));

var pokemon = {
    firstName: "Pika",
    lastname: "Chu ",

    getPokeName: function () {
        var fullname = this.firstName + " " + this.lastname;
        return fullname;
    }
};

var pokemonName = function (agr1, agr2) {
    console.log(this.getPokeName() + "I choose you!");
    console.log(this.getPokeName() + agr1 + ' and ' + agr2);
};

// bind()
var logPokemon = pokemonName.bind(pokemon);
logPokemon("Shushi", "Sasimi");

// call()
pokemonName.call(pokemon, 'A', 'B');

// apply()
pokemonName.apply(pokemon, ["C", "D"]);