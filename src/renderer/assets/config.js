// api
const fs = require('fs')

const path = 'D:/A/data/'

const getTime = (t = Date.now(), f) => {
	let d = new Date(t)
	let da = d.getDate()
	let mo = d.getMonth() + 1
	let time = ''
	if (f) {
		let h = d.getHours()
		let f = d.getMinutes()
		let s = d.getSeconds()
		time = ' ' + h + ':' + f + ':' + s
	}
	da = da < 10 ? '0' + da : da
	mo = mo < 10 ? '0' + mo : mo
	return d.getFullYear() + '-' + mo + '-' + da + (f ? time : '')
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
	getTime,
	log
}

export {
	api
}
