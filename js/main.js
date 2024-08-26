const lists = document.querySelectorAll('.list')
const button = document.querySelector('.button')
document.addEventListener('dblclick', e=>{
    if (e.target.classList.contains("boards__item") && !e.target.classList.contains("start-board")){
        e.target.remove();
    }
    else if (e.target.parentElement.classList.contains("boards__item") && !e.target.parentElement.classList.contains("start-board")){
        e.target.parentElement.remove();
    }
});

function addTask() {
    const btn = document.querySelector('.add__btn')
    const addBtn = document.querySelector('.add__item-btn')
    const cencelBtn = document.querySelector('.cancel__item-btn')
    const textarea = document.querySelector('.textarea')
    const form = document.querySelector('.form')

    let value


    btn.addEventListener('click', () => {
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'

        textarea.addEventListener('input', e => {
            value = e.target.value

            if (value) {
                addBtn.style.display = 'block'
            }
            else {
                addBtn.style.display = 'none'
            }
        })

    })

    cencelBtn.addEventListener('click', () => {
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'

    })


    addBtn.addEventListener('click', () => {

        // const lists = e.target.parentElement
        // console.log(lists)
        const newItem = document.createElement('div')
        newItem.classList.add('list__item')
        newItem.draggable = true
        newItem.textContent = value
        lists[0].append(newItem)

        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'

        dargNdrop()
    })

}

addTask()

function addBoard() {
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards__item')
    board.innerHTML = `
 <span contenteditable="true" class="title">
                        Введите значения
                    </span>
                    <div class="list">
                        
                    </div>
 `
    boards.append(board)

    changeTitle()
    dargNdrop()
}
button.addEventListener('click', addBoard)


function changeTitle() {
    const titles = document.querySelectorAll('.title')
    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '')
    })
}
changeTitle()



let draggedItem = null

function dargNdrop() {
    const listItems = document.querySelectorAll('.list__item')
    const lists = document.querySelectorAll('.list')

    for (let i = 0; i < listItems.length; i++) {

        const item = listItems[i]

        item.addEventListener('dragstart', () => {
            draggedItem = item
            setTimeout(() => {
                item.style.display = 'none'
            }, 0)
        })
        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            }, 0)
        })

        item.addEventListener('dblclick', () => {
            item.remove()
        })

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j]

            list.addEventListener('dragover', e => e.preventDefault())

            list.addEventListener('dragenter', function (e) {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(255,255,255, .3)'
            })

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(255,255,255, 0)'
            })

            list.addEventListener('drop', function (e) {
                this.style.backgroundColor = 'rgba(255,255,255, 0)'
                this.append(draggedItem)
            })
        }

    }

}
dargNdrop()


// function delBoard() {

//     const boards = document.querySelectorAll('.boards__item')

//     for (let k = 1; k < boards.length; k++) {

//         const board = boards[k]

//         board.addEventListener('dblclick', () => {
//             board.remove()

//         })

//     } 
//     // сделай проверку через ивент. если он нужного класса то удаляй если нет то нет. не стоит благодарности
// }
// delBoard()

