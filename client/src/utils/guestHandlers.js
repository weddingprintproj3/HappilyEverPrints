
export function handleGuestSubmit () {
    const tableNumber = document.getElementById('tablenumber').value;

    if (tableNumber < 9){
        let newGuest = document.createElement("li");
        newGuest.innerText = document.getElementById('Guestfirstname').value + " " + document.getElementById('Guestlastname').value
        document.getElementById(`table${tableNumber}members`).appendChild(newGuest)
        document.getElementById('tablenumber').value = ''
        document.getElementById('Guestfirstname').value  = ''
        document.getElementById('Guestlastname').value = ''
    } else {
        alert('Please enter a number between 1 and 8')
    }
}

