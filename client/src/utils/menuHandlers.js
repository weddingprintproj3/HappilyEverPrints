export function handleMenuSubmit () {
    const course = document.getElementById('course').value;


        let menuItem = document.createElement("li");
        menuItem.innerText = document.getElementById('itemname').value
        document.getElementById(`${course.toLowerCase()}list`).appendChild(menuItem)
        document.getElementById('course').value = ''
        document.getElementById('itemname').value  = ''

}