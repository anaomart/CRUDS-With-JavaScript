let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let theInput = document.querySelectorAll('input');
let mode = 'create';
let temp;
// calculate tje total 
function getTotal() {
    if (price.value > 0) {
        total.textContent = (+price.value + +taxes.value + +ads.value) -
            ((+price.value + +taxes.value + +ads.value) / 100 * +discount.value);
        total.style.backgroundColor = 'green'
    } else if (price.value == '') {
        total.textContent = '0'
        total.style.backgroundColor = 'red'
    }

}
// create product
let dataPro;
if (localStorage.product != null) {
    dataPro = [...JSON.parse(localStorage.product)]
} else {
    dataPro = []
}
document.body.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        submit.click();
    }
});

submit.onclick = function() {
    if (title.value == '' || price.value == '') {
        prompt('Enter The price and title')
    } else {
        let newPro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.textContent,
            count: count.value,
            category: category.value.toLowerCase(),
        }

        if (mode == 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else if (newPro.count == '') {
                dataPro.push(newPro)
            }
        } else {
            dataPro[temp] = newPro;
            mode = 'create';
            submit.innerHTML = 'Create'
        }


        localStorage.setItem('product', JSON.stringify(dataPro));
        ShowData()
        clearData();
    }
};
// clear inputs

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}
// read 
function ShowData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price }</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=update(${i}) class="update">Update</button></td>
        <td><button onclick="Delete(${i})" class="delete">Delete</button>
    </tr>`
    }

    document.getElementById('tbody').innerHTML = table;
    if (dataPro.length > 0) {
        document.querySelector('.deleteAll').innerHTML = `<button onclick="DeleteAll()" class="deleteAll ">Delete All (${dataPro.length})</button>`
    } else {
        document.querySelector('.deleteAll').innerHTML = '';
    }
}
// Delete 
function Delete(e) {
    dataPro.splice(e, 1);
    localStorage.product = JSON.stringify(dataPro);
    ShowData();
}
// DeleteAll
function DeleteAll() {
    console.log('Deleting all');
    localStorage.clear();
    dataPro.splice(0);
    ShowData();
}


function update(i) {
    title.value = dataPro[i].title || '';
    price.value = dataPro[i].price || '';
    taxes.value = dataPro[i].taxes || '';
    ads.value = dataPro[i].ads || '';
    discount.value = dataPro[i].discount || '';
    category.value = dataPro[i].categories || '';
    submit.innerHTML = 'Update';
    mode = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })

}

let searchMode = 'title';

function getSearchMode(id) {
    search = document.querySelector('#search');
    if (id == "searchTitle") {
        searchMode = 'title';
    } else {
        searchMode = 'searchCategory';

    }
    search.focus();
    search.value = '';
    ShowData();
}


function searchFor(value) {

    table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMode == 'title') {
            if (dataPro[i].title.includes(value)) {
                if (dataPro[i].title.toLowerCase().includes(value)) {
                    table += `<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price }</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick=update(${i}) class="update">Update</button></td>
            <td><button onclick="Delete(${i})" class="delete">Delete</button>
        </tr>`
                }




            }


        } else {
            console.log('gg')
            if (dataPro[i].category.toLowerCase().includes(value)) {
                table += `<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price }</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=update(${i}) class="update">Update</button></td>
        <td><button onclick="Delete(${i})" class="delete">Delete</button>
    </tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;

}

ShowData()
    // calculate tje total 
    // create product
    // save localStorage
    // clear inputs
    // read 
    // count 
    // delete 
    // update 
    // search 
    // clean data
    // clean data