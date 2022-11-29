import { Drink, RestApiDrinkById, RestApidrinksByName } from "./models";

export const sortingDrinkByName = (
    query: RestApidrinksByName[]
): RestApidrinksByName[] => {
    const sortedList = query.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
    return sortedList;
};

export const handleMapping = (drink: RestApiDrinkById): Drink => {
    const cleanDrink: Drink = {
        idDrink: '',
        name: '',
        category: '',
        glass: '',
        image: '',
        drinkIngr: [],
        drinkInstruction: [],
    };

    cleanDrink.idDrink = drink.idDrink;
    cleanDrink.name = drink.strDrink;
    cleanDrink.category = drink.strCategory;
    cleanDrink.glass = drink.strGlass;
    cleanDrink.image = drink.strDrinkThumb;

    for (let i = 1; i <= 15; i++) {
        const keyIngredients = `strIngredient${i}` as keyof typeof drink;
        const keyMesure = `strMesure${i}` as keyof typeof drink

        if (drink[keyIngredients] !== null) {
            cleanDrink.drinkIngr.push({
                name: drink[keyIngredients],
                measure: drink[keyMesure]
            })
        }
    };

    if (drink.strInstructions !== null) {
        cleanDrink.drinkInstruction.push({
            name: 'EN',
            langDes: drink.strInstructions
        })
    }

    if (drink.strInstructionsES !== null) {
        cleanDrink.drinkInstruction.push({
            name: 'ES',
            langDes: drink.strInstructionsES
        })
    }

    if (drink.strInstructionsDE !== null) {
        cleanDrink.drinkInstruction.push({
            name: 'DE',
            langDes: drink.strInstructionsDE
        })
    }

    if (drink.strInstructionsIT !== null) {
        cleanDrink.drinkInstruction.push({
            name: 'IT',
            langDes: drink.strInstructionsIT
        })
    }

    return cleanDrink;
}