// Funcion para guardar carrito en local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveToLocalStorage = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};
// Mostrar carrito de compras
const showCartMenu = () => {
	cartMenuContainer.style.display = "grid";
	window.innerWidth < 900 ? ((navbarMenu.style.display = "none"), overlay.classList.remove("show-overlay")) : "";
	overlay.classList.toggle("show-overlay");
	header.style.opacity = 1;
	getPrices();
};
// Ocultar carrito de compras
const closeCartMenu = () => {
	cartMenuContainer.style.display = "none";
	overlay.classList.remove("show-overlay");
	header.style.opacity = 0.9;
};

const closeCartMenuToScroll = () => {
	window.onscroll = () => {
		if (document.documentElement.scrollTop > 30) {
			closeCartMenu();
			overlay.classList.remove("show-overlay");
		} else {
			return;
		}
	};
};


// Finalizar compra

const checkout = () => {
	if(isButtonBuyActive()){
		const confirmCheckout= window.confirm("¿Desea finalizar la compra?");
	if (confirmCheckout) {
		deleteAllProductsItems();
		window.alert("Su compra ha finalizado. Gracias por elegirnos!");
		closeCartMenu();
	} else return;
	} else return;
	
}

// Chequea si el botón de finalizar compra está activo

const isButtonBuyActive = () => {
	if (buttonBuy.classList.contains("active-button-buy")){
		return true;
	} else return false;
}

// Mostrar menu hamburguesa
const openCloseBurguerMenu = () => {
	if (navbarMenu.style.display === "flex") {
		navbarMenu.style.display = "none";
		header.style.opacity = 0.9;
		overlay.classList.remove("show-overlay");
	} else {
		navbarMenu.style.display = "flex";
		cartMenuContainer.style.display = "none";
		header.style.opacity = 1;
		overlay.classList.toggle("show-overlay");
	}
};

//fix display nav
const showNavBar = () => {
	if (window.innerWidth > 900) {
		navbarMenu.style.display = "flex";
	} else {
		navbarMenu.style.display = "none";
	}
};

const renderNoPopulars = (noPopularsArray, current) => {
	menuContainer.innerHTML += noPopularsArray[current].map(desestructuringPopulars).join("");
};

const showLessFunction = (array) => {
	showButtonMore();
	renderMostPopulars(array[0], 0);
};

const showButtonMore = () => {
	showMoreButton.classList.remove("disabled");
	showLessButton.classList.add("disabled");
};
const showButtonLess = () => {
	navigator.current = 0;
	showMoreButton.classList.add("disabled");
	showLessButton.classList.remove("disabled");
};

const showFourMore = () => {
	const noPopularRest = productsArray.filter((e) => !e.popular);
	const result = [];
	const size = 4;
	for (let i = 0; i <= noPopularRest.length; i += size) {
		result.push(noPopularRest.slice(i, i + size));
	}
	renderNoPopulars(result, navigator.current);
	navigator.current < result.length - 2 ? (navigator.current = navigator.current + 1) : showButtonLess();
};

// //funcion de renderizado de los más populares en HTML.
// const renderMostPopulars = (mostPopularsArray) => {
// 	menuContainer.innerHTML = mostPopularsArray.map(desestructuringPopulars).join("");
// };

// funcion solo para desestructurar los objs.
const desestructuringPopulars = (popularObj) => {
	const { id, name, img, price, subtitle, popular } = popularObj;
	return `
	<div class="itemContainer">
		<h2 class="popular-h2 ${popular ? "" : "disabled"}">Popular</h2>
		<img src="${img}" alt="imagen del item" srcset="" />
			<div class="itemDescription">
				<h3 class="itemTitle">${name}</h3>
				<p class="itemSubtitle">${subtitle}</p>
			<div class="itemBuy">
				<p class="price">$ ${price == 0 ? "Gratis" : price}</p>
				<button class="addCart addToCart" data-id=${id}>Agregar</button>
			</div>
			</div>
	</div>
	`;
};

// Filtra los populares y llama al render
// const filterMostPopulars = (arrayOfObjects) => {
// 	const mostPopularFiltered = arrayOfObjects.filter((e) => e.popular);
// 	renderMostPopulars(mostPopularFiltered);
// 	return mostPopularFiltered;
// };

// Renderiza los elementos en el carrito
const renderCartList = (product) => {
	const { id, name, img, price, subtitle, quantity } = product;
	return `
		<div class="items-cart">
			<img class="image-simulate" src="${img}" alt="imagen de producto" />
			<h3 class="items-cart-title">${name}</h3>
			<span class="items-cart-second-title">${subtitle}</span>
			<span class="items-cart-precio">$${price == 0 ? "Gratis" : price}</span>
			<div class="buttons-pedido-container" id="containerLessAndMore">
				<button class="pedido-button-less" id="buttonLess" data-id=${id}>-</button>
				<span class="pedido-value">${quantity}</span>
				<button class="pedido-button-plus" id="buttonPlus" data-id=${id}>+</button>
			</div>
		</div>
	`;
};

// Renderiza en el icono de carrito la cantidad de elementos que hay en el mismo
const renderProductsCounterIcon = () => {
	if (!cart.length) {
		cleanProductsCartIcon();
	} else {
		let productsCounterArray = cart.map(desestructuringQuantity);
		let totalProducts = productsCounterArray.reduce((a, b) => a + b, 0);
		productsCounterIcon.style.display = "flex";
		productsCounterIcon.innerHTML = `<p>${totalProducts}</p>`;
	}
	if (cart.length >= 2) {
		deleteAllMsJ.style.visibility = "visible";
	} else {
		deleteAllMsJ.style.visibility = "hidden";
	}
};

//Función que desestructura la cantidad de cada producto

const desestructuringQuantity = (product) => {
	const { quantity } = product;
	return quantity;
};

// Vacia los precios en caso de no haber productos
const cleanPrices = () => {
	total.textContent = "--";
	subtotal.textContent = "--";
	envio.textContent = "--";
};

// Envia los productos a ser renderizados
const cartRender = () => {
	if (!cart.length) {
		itemsCartSelected.innerHTML = "<p>Tu carrito está vacío :(</p>";
		cleanPrices();
		cleanProductsCartIcon();
		activeButtonBuy();
		return;
	}
	itemsCartSelected.innerHTML = cart.map(renderCartList).join("");
	activeButtonBuy();
};

// Multiplica precio por cantidad y va acumulando para obtener el subtotal
const getPrices = () => {
	const precio = cart.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.quantity), 0);
	let envioPrice;
	if (precio < 5000) {
		envioPrice = "Gratis";
		total.textContent = `$${precio}`;
	} else {
		envioPrice = 500;
		total.textContent = precio + envioPrice;
	}

	envio.textContent = envioPrice;
	subtotal.textContent = `$${precio}`;

	if (!cart.length) {
		cleanPrices();
	}
};
// Funcion que incrementa la cantidad del item en el carrito
const incrementQuantity = (idProduct) => {
	cart = cart.map((item) => {
		if (item.id == idProduct) {
			item.quantity++;
			renderProductsCounterIcon();
			return item;
		} else {
			return item;
		}
	});
	deleteItem();
};

// Funcion que borra el item si la cantidad es cero
const deleteItem = () => {
	cart = cart.filter((item) => item.quantity);
	getPrices();
	saveToLocalStorage(cart);
	cartRender();
	renderProductsCounterIcon();
	activeButtonBuy();
};

// Funcion que decrementa la cantidad del item en el carrito
const decrementQuantity = (idProduct) => {
	cart = cart.map((item) => {
		if (item.id == idProduct) {
			item.quantity--;
			renderProductsCounterIcon();
			if (!item.quantity) {
				deleteItem(idProduct);
			}
			return item;
		} else {
			return item;
		}
	});
	deleteItem();
};

//Función que oculta el icono de cantidad de productos del carrito
const cleanProductsCartIcon = () => {
	productsCounterIcon.style.display = "none";
};

// Funcion que alerta si un elemento ya está en el carrito
const alertCart = () => {
	return alert("El item seleccionado ya se encuentra dentro del carrito.");
};

// Añade el item a el carrito
const addToCart = (itemSelected) => {
	const withQuantity = { ...itemSelected, quantity: 1 };
	cart.push(withQuantity);
	getPrices();
	cartRender();
	saveToLocalStorage(cart);
	renderProductsCounterIcon();
};

// Funcion que verifica antes de agregar el item
const checkBeforeToAdd = (itemSelected) => {
	if (!cart.length) {
		addToCart(itemSelected);
		return;
	} else {
		const mapItemsId = cart.map((element) => element.id);
		if (mapItemsId.includes(itemSelected.id)) {
			alertCart();
			return;
		}
	}
	addToCart(itemSelected);
};

// Estila el botón de compra si hay productos o no

const activeButtonBuy = () => {

	if (!cart.length) {
		if (buttonBuy.classList.contains("active-button-buy")) {
			buttonBuy.classList.remove("active-button-buy");
		}
		buttonBuy.classList.toggle("desactive-button-buy");
	} else {
		if (buttonBuy.classList.contains("active-button-buy")) {
			return;
		}
		buttonBuy.classList.toggle("active-button-buy");
	}
}


// Funcion que obtiene el elemento y lo añade al carro o cambia la cantidad segun corresponda
const getItemInfo = (e) => {
	const idProduct = e.target.dataset.id;
	const itemSelected = productsArray.filter((item) => item.id == idProduct)[0];
	if (e.target.classList.contains("pedido-button-less")) {
		return decrementQuantity(idProduct);
	} else if (e.target.classList.contains("pedido-button-plus")) {
		return incrementQuantity(idProduct);
	} else if (e.target.classList.contains("addToCart") || e.target.classList.contains("recommendedAddToCart")) {
		checkBeforeToAdd(itemSelected);
		return;
	}
};



const randomRecommended = () => {
	const result = productsArray.filter((item) => randomNums.includes(item.id));
	const recommendedArray = result.slice(0, 3);
	recommendedArray.filter(renderRecommended);
};


const renderRecommended = (value) => {
	const { id, name, subtitle, price, img } = value;
	const recommendedContainer = document.createElement("div");
	recommendedContainer.className = "recommendedContainer";
	recommendedContainer.innerHTML = `<img src="${img}" alt="">
								<div class="recommendedTextGroup">
									<span id="recommendedTitle" class="recommendedTitle">${name}</span>
									<span id="recommendedParap" class="recommendedParap">${subtitle}</span>
									<span id="recommendedPrice" class="recommendedPrice">$${price == 0 ? "Gratis" : price}</span>
								</div>
								<div class="recommendedBtn">
									<button class='recommendedAddToCart' data-id=${id}>Agregar</button>
								</div>`;
	recommendedApp.appendChild(recommendedContainer);
};

// Función que elimina todos los productos del carrito

const deleteAllProductsItems = () => {
	itemsCartSelected.innerHTML = "";
	deleteAllMsJ.style.visibility = "hidden";
	cart = [];
	saveToLocalStorage(cart);
	getPrices();
	renderProductsCounterIcon();
	activeButtonBuy();
};
let randomNums = (arrayfor = []);
//se crean 12 numeros aleatorios
for (let i = 0; i < 12; i++) {
	let resultado = Math.floor(Math.random() * 28);
	if (!arrayfor.includes(resultado)) {
		arrayfor.push(resultado);
	} else {
		i--;
	}
}
//Renderiza los random en base al array randomNums
const randomProducts = () => {
	menuContainer.innerHTML = "";
	newPopular = productsArray.filter((objeto) => randomNums.includes(objeto.id));
	renderNewPopular = newPopular.map((object) => (menuContainer.innerHTML += desestructuringPopulars(object)));
};

// Resalta la categoria seleccionada
const changeBtnActive = (clickData) => {
	const categories = [...allCategories];
	categories.forEach((category) => {
		console.log(category.dataset.type);
		if (category.dataset.type !== clickData) {
			category.classList.remove("active");
			return;
		}

		category.classList.add("active");
	});
};

// Selecciona categoria y lo renderiza
const renderMenu = (e) => {
	const clickData = e.target.dataset.type;
	if (clickData === "popular") {
		randomProducts();
	} else if (clickData) {
		menuContainer.innerHTML = "";
		const obtainProduct = productsArray.filter(
			(objeto) => objeto.category === clickData
		);
		renderProduct = obtainProduct.map(
			(object) => (menuContainer.innerHTML += desestructuringPopulars(object))
		);
	
		changeBtnActive(clickData);
	}
};

const init = () => {
	cartNavIcon.addEventListener("click", showCartMenu);
	closeButton.addEventListener("click", closeCartMenu);
	burguerIcon.addEventListener("click", openCloseBurguerMenu);
	showMoreButton.addEventListener("click", showFourMore);
// 	showLessButton.addEventListener("click", () => showLessFunction(filterMostPopulars(productsArray)));
// 	filterMostPopulars(productsArray);
	menuContainer.addEventListener("click", getItemInfo);
	cartMenuContainer.addEventListener("click", getItemInfo);
	recommendedApp.addEventListener("click", getItemInfo);
	window.addEventListener("resize", showNavBar);
	document.addEventListener("click", renderMenu);
	deleteAllMsJ.addEventListener("click", deleteAllProductsItems);
	buttonBuy.addEventListener("click", checkout);
	renderProductsCounterIcon();
	closeCartMenuToScroll();
	randomRecommended();
	randomProducts()
};

cartRender();

init();
