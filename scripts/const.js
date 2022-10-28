// Carrito
const cartMenuContainer = document.querySelector("#cart_menu_container");
const itemsCartSelected = document.querySelector(".items-cart-container");
const subtotal = document.querySelector(".precio-span-subtotal");
const total = document.querySelector(".total-span-precio");
const envio = document.querySelector(".precio-span-envio");
const containerLessAndMore = document.querySelector("#containerLessAndMore");
const buttonLess = document.querySelector("#buttonLess");
const buttonPlus = document.querySelector("#buttonPlus");
const deleteAllMsJ = document.querySelector("#deleteAllMsJ");
const itemsCartContainer = document.querySelector("#items-cart-container");
const overlay = document.querySelector(".overlay");
const header = document.querySelector("header");
const buttonBuy = document.querySelector(".button-buy");
// Menu Hamb
const burguerIcon = document.getElementById("burguerMenu");
const navbarMenu = document.querySelector("#navbarMenu");

// Nav
const cartNavIcon = document.querySelector("#cart_nav_icon");
const closeButton = document.querySelector("#closeButton");
const productsCounterIcon = document.querySelector("#productsCounterIcon");
// Body
const showMoreButton = document.querySelector("#showMoreButton");
const showLessButton = document.querySelector("#showLess");
const menuContainer = document.getElementById("mostPopularContainer");
const allCategories = document.querySelectorAll(".category");
// Recommended
const recommendedApp = document.getElementById("recommendedApp");
const recommendedAddToCart = document.getElementById("recommendedAddToCart");



let navigator = {
	current: 0,
	prev: null,
};

const productsArray = [
	{
		id: 1,
		name: "Muzzarela",
		category: "pizza",
		img: "./assets/img/pizzas/pizza3.png",
		popular: false,
		price: 1250,
		subtitle: "Solo para expertos",
	},
	{
		id: 2,
		name: "Con peperoni",
		category: "pizza",
		img: "./assets/img/pizzas/pizza6.png",
		popular: false,
		price: 1400,
		subtitle: "Peperoni papá",
	},
	{
		id: 3,
		name: "Con jamon crudo y rucula",
		category: "pizza",
		img: "./assets/img/pizzas/pizza2.png",
		popular: false,
		price: 1250,
		subtitle: "Jamoncituuuu",
	},
	{
		id: 4,
		name: "Con vegetales",
		category: "pizza",
		img: "./assets/img/pizzas/pizza1.png",
		popular: false,
		price: 1100,
		subtitle: "Re vegano pa",
	},
	{
		id: 5,
		name: "Con Cheddar y hongos",
		category: "pizza",
		img: "./assets/img/pizzas/pizza4.png",
		popular: false,
		price: 0,
		subtitle: "Quesito",
	},
	{
		id: 6,
		name: "Pizza veggie",
		category: "pizza",
		img: "./assets/img/pizzas/pizza8.png",
		popular: false,
		price: 1290,
		subtitle: "Dale que sos vos",
	},
	{
		id: 7,
		name: "Hamburguesa completa",
		category: "hamburguesa",
		img: "./assets/img/products/completa.jpg",
		popular: false,
		price: 800,
		subtitle: "Esoo es lindo che",
	},
	{
		id: 8,
		name: "Con queso",
		category: "hamburguesa",
		img: "./assets/img/products/simpleQueso.webp",
		popular: false,
		price: 750,
		subtitle: "Queso nomás",
	},
	{
		id: 9,
		name: "Con queso Brie y hongos",
		category: "hamburguesa",
		img: "./assets/img/products/mushroomBrie.jpg",
		popular: false,
		price: 750,
		subtitle: "Upaa!!",
	},
	{
		id: 10,
		name: "Con barbacoa",
		category: "hamburguesa",
		img: "./assets/img/products/barbecue.webp",
		popular: false,
		price: 850,
		subtitle: "Juega bastante",
	},
	{
		id: 11,
		name: "Con aros de cebolla",
		category: "hamburguesa",
		img: "./assets/img/products/onionRing.jpg",
		popular: false,
		price: 850,
		subtitle: "Muy ricasss",
	},
	{
		id: 12,
		name: "Veggie de lentejas",
		category: "hamburguesa",
		img: "./assets/img/products/veggie.jpg",
		popular: false,
		price: 700,
		subtitle: "Lentejuelas",
	},
	{
		id: 13,
		name: "Papas fritas",
		category: "papas",
		img: "./assets/img/products/fries.jpg",
		popular: false,
		price: 700,
		subtitle: "Salen fritas",
	},
	{
		id: 14,
		name: "Con Bacon&Cheddar",
		category: "papas",
		img: "./assets/img/products/friesBacon.jpg",
		popular: false,
		price: 800,
		subtitle: "Cheddar",
	},
	{
		id: 15,
		name: "Con Chili",
		category: "papas",
		img: "./assets/img/products/friesChili.jpg",
		popular: false,
		price: 750,
		subtitle: "Ta que arde",
	},
	{
		id: 16,
		name: "Con queso crema y ciboulette",
		category: "papas",
		img: "./assets/img/products/friesCreamChesse.jpg",
		popular: false,
		price: 1000,
		subtitle: "Riquisimo",
	},
	{
		id: 17,
		name: "Con carne",
		category: "wrap",
		img: "./assets/img/products/wrapMeat.jpg",
		popular: false,
		price: 1000,
		subtitle: "Clasico",
	},
	{
		id: 18,
		name: "Con atun",
		category: "wrap",
		img: "./assets/img/products/wrapAtun.jpg",
		popular: false,
		price: 900,
		subtitle: "Tradicional",
	},
	{
		id: 19,
		name: "De vegetales",
		category: "wrap",
		img: "./assets/img/products/wrapVeggie.webp",
		popular: false,
		price: 950,
		subtitle: "Veggie",
	},
	{
		id: 20,
		name: "Tacos de carne",
		category: "mexicana",
		img: "./assets/img/products/tacosMeat.webp",
		popular: false,
		price: 1250,
		subtitle: "A lo mexicano",
	},
	{
		id: 21,
		name: "Tacos Veggie",
		category: "mexicana",
		img: "./assets/img/products/tacosVeggie.jpg",
		popular: false,
		price: 1000,
		subtitle: "Veggie mexico",
	},
	{
		id: 22,
		name: "Quesadilla",
		category: "mexicana",
		img: "./assets/img/products/quesadilla.jpg",
		popular: false,
		price: 600,
		subtitle: "Un lujo",
	},
	{
		id: 23,
		name: "Nachos con cheddar",
		category: "mexicana",
		img: "./assets/img/products/nachosCheddar.webp",
		popular: false,
		price: 780,
		subtitle: "Caseros",
	},
	{
		id: 24,
		name: "Nachos full",
		category: "mexicana",
		img: "./assets/img/products/nachosBeans.jpg",
		popular: false,
		price: 950,
		subtitle: "Completos",
	},
	{
		id: 25,
		name: "De frutilla",
		category: "batido",
		img: "./assets/img/products/shakeStrawberry.webp",
		popular: false,
		price: 600,
		subtitle: "Postre",
	},
	{
		id: 26,
		name: "De chocolate",
		category: "batido",
		img: "./assets/img/products/shakeChocolate.jpg",
		popular: false,
		price: 600,
		subtitle: "Postre",
	},
	{
		id: 27,
		name: "Sprinkle",
		category: "batido",
		img: "./assets/img/products/shakeSprinkle.webp",
		popular: false,
		price: 600,
		subtitle: "Postre",
	},
	{
		id: 28,
		name: "De Mashmellow",
		category: "batido",
		img: "./assets/img/products/shakeMashmellow.jpg",
		popular: false,
		price: 600,
		subtitle: "Postre",
	},
];
const date = new Date();

productsArray.forEach((item) => {
	if (item.id % 2 == 0 && date.getDay % 2 == 0) {
		item.popular = true;
	} else if (item.id % 2 != 0 && date.getDay % 2 != 0) {
		item.popular = true;
	} else {
		item.popular = false;
	}
});
