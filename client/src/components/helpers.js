const valuta = {ro: " lei", ru: " лей"},
    themes = {
        light: {
        foreground: '#000000',
        background: '#ffffff',
        icon: 'images/sun3.jpg'
        },
        dark: {
        foreground: '#ffffff',
        background: '#f0f0f0',
        icon: 'images/moon1.png'
        },
    },
    side = {ro: ["Smartphoane", "Tablete", "Ceasuri", "Accesorii"], ru: ["Смартфоны", "Планшеты", "Часы", "Аксессуары"]},
    nav = {ro: ["Catalog", "Livrare", "Contacte"], ru: ["Каталог", "Доставка", "Контакты"]},
    links = ["/", "/livrare", "/contacte", "/smartphoane", "/tablete", "/ceasuri", "/accesorii"],
    colorkey = {ro: "Culoare", ru: "Цвет"},
    memorykey = {ro: "Memorie", ru: "Память"},
    errors={ro :{nume: ["Câmpul trebuie să conțină minim 3 caractere!", "Câmpul nu trebuie să conțină cifre!"], telefon: ["Câmpul trebuie să conțină minim 6 cifre!","Câmpul nu trebuie să conțină litere!"]}, ru :{nume: ["Это поле должно содержать минимум 3 символа", "Это поле не может содержать цифр!"], telefon: ["Это поле должно содержать минимум 6 символов","Это поле не может содержать букв!"]}},
    mapObject = (obj, cb) => {
        let result=[];
        for(let key in obj) result.push(cb(key, obj[key]));
        return result;
    },
    orase={ro: ["Chișinău", "Soroca"], ru: ["Кишинёв" , "Сорока"], distance: [0,200]},
    isMobile = (width) => width < 768,
    isTablet = (width) => width < 992,
    isDesktop = (width) => width > 1199,
    search = (search, props) => {
        let x = search.match(/\w+/g);
          return !search ? this.getProducts(props) : x ? props.products.filter(
          (y)=> x.every(
              (ex) => new RegExp(ex.length === 1 ? "\\b"+ ex : ex, "i").test(y.keywords))) : [];
    };

    // Array.prototype.replace = function(index) {
    //     this.splice.apply(this, [index, arguments.length-1].concat(
    //         Array.prototype.slice.call(arguments, 1)));
    //     return this;
    // };
    const defaultProps = {
        "Name": "",
        "Keywords": "",
        "Hex colors": [],
        "Culori": [],
        "Images": [],
        "Thumbnail": "",
        "Brand": "",
        "Video": "",
        "Hottness": 50,
        "Popularity": 50,
        "Price": [1000],
        "Warranty": 1
    },
    formProps = [{
        ...defaultProps,      
        "Dimensiune" : "",
        "Greutate":  "",
        "Nr Sim": [], 
        "Slot memorie": "",
        "RAM": "",
        "Memorie": [],       
        "OS": "",         
        "Tip ecran" : "",
        "Rezolutie": "",
        "Diagonală": "",
        "Baterie": "",
        "Chipset": "",
        "CPU": "",
        "GPU": "",
        "Nr nuclee": "",
        "Camera Primară": "",
        "Camera Secundară": "",
        "Rezolutie video" : ""        
    },
    {
        ...defaultProps,
        "Dimensiune" : "",
        "Greutate":  "",
        "Materialul carcasei (ro)" : "",
        "Materialul carcasei (ru)" : "",
        "Sim": "", 
        "Slot memorie": "",
        "RAM": "",
        "Memorie internă": "",       
        "OS": "",         
        "Tip display" : "",
        "Rezolutie": "",
        "Diagonală": "",
        "Capacitate": "",
        "Durată" : "",
        "Chipset": "",
        "CPU": "",
        "GPU": "",
        "Wi-Fi": "",
        "GPS": "",
        "NFC": "",
        "Bluetooth": ""
    }],
    toProduct = ({product, i}) => {
        let props = {};
        switch(i) {
            case 0: props = mobileProps(product);
            break;
            case 1: props = watchProps(product);
            break;
        }
        return {
            "colors": product["Hex colors"].filter((v) => v!== "").map((v)=>v.trim()),
            "hottness": +product["Hottness"],
            "popularity": +product["Popularity"],
            "price": product["Price"].filter((v) => v!== "").map((v)=>+v),
            "name": product["Name"].trim().capitalize(),
            "keywords": product["Keywords"].trim().toLowerCase(),   
            "thumbnail": product["Thumbnail"].trim(),
            "images": product["Images"].map((arr) => arr.filter((v) => v!== "").map((v)=>v.trim())),
            "video": product["Video"].trim(),
            "warranty": +product['Warranty'],
            ...props
        }
    },
    mobileProps = (product) => ({
            "cattegory": "smartphoane",        
            "filter": {
                "ro": {
                    "Culoare": product["Culori"].filter((v) => v!== "").map((v)=>v.trim().capitalize()),
                    "Brand": [product["Brand"].trim().capitalize()],
                    "RAM": [product["RAM"].replace(/\D/g, '').concat(" GB")],
                    "Memorie": product["Memorie"].filter((v) => v!== "").map((v)=> v.replace(/\D/g, '').concat(" GB")),
                    "Nr nuclee": [+product["Nr nuclee"]],
                    "OS": [product["OS"].replace(/[^A-Za-z]/g, '').capitalize() + " " + Math.floor(product["OS"].replace(/[^0-9.]/g, ''))],
                    "Nr Sim": product["Nr Sim"].filter((v) => v!== "").map((v)=> +v.replace(/\D/g, '')),
                    "Display": [product["Rezolutie"].match(/\d+/g).join(' x ')],
                    "Diagonală": [product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')],
                    "Baterie": [product["Baterie"].replace(/\D/g, '').concat(" mAh")]
                },
                "ru": {
                    "Цвет": product["Culori"].filter((v) => v!== "").map((v)=>v.trim().capitalize()),
                    "Бренд": [product["Brand"].trim().capitalize()],
                    "RAM": [product["RAM"].replace(/\D/g, '').concat(" ГБ")],
                    "Память": product["Memorie"].filter((v) => v!== "").map((v)=> v.replace(/\D/g, '').concat(" ГБ")),
                    "Кол ядер": [+product["Nr nuclee"]],
                    "ОС": [product["OS"].replace(/[^A-Za-z]/g, '').capitalize() + " " + Math.floor(product["OS"].replace(/[^0-9.]/g, ''))],
                    "Колчество СИМ": product["Nr Sim"].filter((v) => v!== "").map((v)=> +v.replace(/\D/g, '')),
                    "Экран": [product["Rezolutie"].match(/\d+/g).join(' x ')],
                    "Диагональ экрана": [product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')],
                    "Батарея": [product["Baterie"].replace(/\D/g, '').concat(" mAh")]
                }
            },
            "specs": {
                "ro": {
                    "Generale": {
                        "Nr SIM": product["Nr Sim"].filter((v) => v!== "").map((v)=> v.replace(/\D/g, '')).join("/"),                       
                        "OS": product["OS"].trim().capitalize(),
                        "Dimensiune" : product["Dimensiune"].match(/[0-9.]+/g).join(' x ').concat(' mm'),
                        "Greutate" : product["Greutate"].replace(/\D/g, '').concat(' g')
                    },
                    "Procesor": {
                        "Chipset": product["Chipset"].trim(),
                        "CPU": product["CPU"].trim(),
                        "GPU": product["GPU"].trim()
                    },
                    "Memorie": {
                        "RAM": product["RAM"].replace(/\D/g, '').concat(" GB"),
                        "Slot memorie": product["Slot memorie"].trim()
                    },
                    "Cameră": {
                        "Primară": product["Camera Primară"].replace(/[^0-9x+\s]/g, '').trim().concat(" MP"),
                        "Secundară": product["Camera Secundară"].replace(/[^0-9x+\s]/g, '').trim().concat(" MP"),
                        "Rezoluție video": product["Rezolutie video"].trim()
                    },
                    "Display": {
                        "Tip display": product["Tip ecran"].trim(),
                        "Rezoluție": product["Rezolutie"].match(/\d+/g).join(' x ').concat(' px'),
                        "Diagonală": product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')
                    },
                    "Baterie": {
                        "Capacitate": product["Baterie"].replace(/\D/g, '').concat(" mAh")
                    }
                },
                "ru": {
                    "Основные": {
                        "Колчество СИМ": product["Nr Sim"].filter((v) => v!== "").map((v)=> v.replace(/\D/g, '')).join("/"),   
                        "OС": product["OS"].trim().capitalize(),
                        "Размер" : product["Dimensiune"].match(/[0-9.]+/g).join(' x ').concat(' мм'),
                        "Вес" : product["Greutate"].replace(/\D/g, '').concat(' г')          
                    },
                    "Процессор": {
                        "Chipset": product["Chipset"].trim(),
                        "CPU": product["CPU"].trim(),
                        "GPU": product["GPU"].trim()
                    },
                    "Память": {
                        "RAM": product["RAM"].replace(/\D/g, '').concat(" ГБ"),
                        "Слот для карт памяти": product["Slot memorie"].replace(/Da, pana la/, "Да, до").replace(/Nu/, 'Нет').replace(/GB/, 'ГБ').trim()
                    },
                    "Камера": {
                        "Основная": product["Camera Primară"].replace(/[^0-9x+\s]/g, '').trim().concat(" МП"),
                        "Вторичная": product["Camera Secundară"].replace(/[^0-9x+\s]/g, '').trim().concat(" МП"),
                        "Разрешение видео": product["Rezolutie video"].trim()
                    },
                    "Экран": {
                        "Тип экрана": product["Tip ecran"].trim(),
                        "Разрешение": product["Rezolutie"].match(/\d+/g).join(' x ').concat(' px'),
                        "Диагональ": product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')
                    },
                    "Батарея": {
                        "Ёмкость": product["Baterie"].replace(/\D/g, '').concat(" mAh")
                    }
                }
            }
    }),
    watchProps = (product) => ({
        cattegory: "ceasuri",
        filter : {
            ro: {
                "Culoare": product["Culori"].filter((v) => v!== "").map((v)=>v.trim().capitalize()),
                "Brand": [product["Brand"].trim().capitalize()],
                "OS": [product["OS"].replace(/[^A-Za-z]/g, '').capitalize()],
                "Sim": [product["Sim"].trim()],
                "Display": [product["Rezolutie"].match(/\d+/g).join(' x ')],
                "Diagonală": [product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')],
                "Baterie": [product["Capacitate"].replace(/\D/g, '').concat(" mAh")]
            },
            ru: {
                "Цвет": product["Culori"].filter((v) => v!== "").map((v)=>v.trim().capitalize()),
                "Бренд": [product["Brand"].trim().capitalize()],
                "ОС" : [product["OS"].replace(/[^A-Za-z]/g, '').capitalize()],
                "Сим": [product["Sim"].replace(/nu/i, "нет").trim()],
                "Экран": [product["Rezolutie"].match(/\d+/g).join(' x ')],
                "Диагональ экрана": [product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')],
                "Батарея": [product["Capacitate"].replace(/\D/g, '').concat(" mAh")]
            }
        },
        specs: {
            ro: {
                "Generale": {
                    "Sim": product["Sim"].trim(),
                    "OS" : product["OS"].trim().capitalize(),
                    "Dimensiune" :product["Dimensiune"].match(/[0-9.]+/g).join(' x ').concat(' mm'),
                    "Greutate" : product["Greutate"].replace(/\D/g, '').concat(' g'),
                    "Materialul carcasei" : product["Materialul carcasei (ro)"].trim()
                },                
                "Procesor": {
                    "Chipset": product["Chipset"].trim(),
                    "CPU": product["CPU"].trim(),
                    "GPU": product["GPU"].trim()
                },
                "Memorie": {
                    "Memorie internă": product["Memorie internă"].replace(/\D/g, '').concat(" GB"),
                    "RAM": product["RAM"].trim(),
                    "Slot memorie": product["Slot memorie"].trim()
                },
                "Display": {
                    "Rezoluție": product["Rezolutie"].match(/\d+/g).join(' x ').concat(' px'),
                    "Tip display": product["Tip ecran"].trim(),
                    "Diagonală": product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')
                },
                "Baterie" : {
                    "Capacitate": product["Capacitate"].replace(/\D/g, '').concat(" mAh"),
                    "Durată": product["Durată"].trim()
                },
                "Altele" : {
                    "Wi-Fi" : product["Wi-Fi"].trim().capitalize(),
                    "GPS" : product["GPS"].trim().capitalize(),
                    "NFC" : product["NFC"].trim().capitalize(),
                    "Bluetooth" : product["Bluetooth"].replace(/[^0-9.]/g, "").trim()
                }
            },
            ru: {
                "Основные": {
                    "Сим": product["Sim"].replace(/nu/i, "Нет").trim(),  
                    "OС": product["OS"].trim().capitalize(),
                    "Размер" : product["Dimensiune"].match(/[0-9.]+/g).join(' x ').concat(' мм'),
                    "Вес" : product["Greutate"].replace(/\D/g, '').concat(' г'),
                    "Материал корпуса": product["Materialul carcasei (ru)"].trim()         
                },
                "Процессор": {
                    "Chipset": product["Chipset"].trim(),
                    "CPU": product["CPU"].trim(),
                    "GPU": product["GPU"].trim()
                },
                "Память": {
                    "Встроенная память": product["Memorie internă"].replace(/\D/g, '').concat(" ГБ"),
                    "RAM": product["RAM"].replace(/gb/i, "ГБ").replace(/mb/i, "МБ").trim(),
                    "Слот для карт памяти": product["Slot memorie"].replace(/da/i, "Да").replace(/nu/i, "Нет").trim()
                },                
                "Экран": {                   
                    "Разрешение": product["Rezolutie"].match(/\d+/g).join(' x ').concat(' px'),
                    "Тип экрана": product["Tip ecran"].trim(),
                    "Диагональ": product["Diagonală"].replace(/[^0-9.]/g, "").concat('\"')
                },
                "Батарея": {
                    "Ёмкость": product["Capacitate"].replace(/\D/g, '').concat(" mAh"),
                    "Время работы" : product["Durată"].replace(/zile/, "дня").trim()
                },
                "Дополнительно": {
                    "Wi-Fi" : product["Wi-Fi"].replace(/da/i, "Да").replace(/nu/i, "Нет").trim(),
                    "GPS" : product["GPS"].replace(/da/i, "Да").replace(/nu/i, "Нет").trim(),
                    "NFC" : product["NFC"].replace(/da/i, "Да").replace(/nu/i, "Нет").trim(),
                    "Bluetooth" : product["Bluetooth"].replace(/[^0-9.]/g, "").trim()
                }
            }
        }
    }),
    options = [{label: "Mobile", value: 0}, {label: "Watch", value: 1}],
    preload = async (images) => images.flat().forEach((img) => ['big', 'medium', 'small'].forEach((type) => {
        const m = new Image();
        m.src = `/images/resize/${type}/${img}`;
    }));

    String.prototype.capitalize = function() {return this.replace(/\b\w/g,x=>x.toUpperCase())};


export {valuta, themes, nav, links, side, colorkey, memorykey, mapObject, errors, orase, isMobile, isDesktop, isTablet, formProps, options, toProduct, preload, search};
