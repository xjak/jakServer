// api
const fs = require('fs')
const axios = require('axios')
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

const loading = (key, fn) => {
	let div = document.querySelector('#loading')
	if (!div) {
		div = document.createElement('div')
		div.id = 'loading'
		div.innerHTML = '<div><i></i><i></i><i></i><i></i><i></i><i></i></div>'
		document.body.appendChild(div)
	}
	if (key) {
		div.style.display = 'block'
	} else {
		div.style.display = 'none'
	}
	fn && fn()
}

const log = (type = 'login') => {
	fs.writeFile(path + 'logs/' + getTime(Date.now(), 1) + '-' + type + '.txt', getTime(), e => {})
}

/*
* 一言
* @cat
* a - 动画
* b - 漫画
* c - 游戏
* d - 小说
* e - 原创
* f - 网络
* g - 其他
*/
const getPhrase = (t = '') => {
	return axios.get('https://api.imjad.cn/hitokoto/?encode=json&charset=utf-8&cat=' + t)
}

let api = {
	path,
	msg,
	getTime,
	log,
	getPhrase,
	loading
}

export {
	api
}
