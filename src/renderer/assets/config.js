// api
const fs = require('fs')

const path = 'D:/A/data/'

const getTime = () => {
	return new Date().toString()
}

const msg = (text, time = 2000, fn) => {
	let div = document.querySelector('#msg')
	if (!div) {
		div = document.createElement('div')
		div.id = 'msg'
		document.body.appendChild(div)
	}
	div.innerText = text
	div.style.display = 'block'
	setTimeout(() => {
		div.style.display = 'none'
		fn && fn()
	}, time)
}

const log = (type = 'login') => {
	fs.writeFile(path + 'logs/' + Date.now() + '-' + type + '.txt', getTime(), e => {})
}

let api = {
	path,
	msg,
	log
}

export {
	api
}
