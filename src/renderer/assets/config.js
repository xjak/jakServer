// api
const fs = require('fs')
const axios = require('axios')
const path = 'D:/A/data/'

/*
* bili
*
*/

let api = {
	path,
	msg (text, time = 2000, fn) {
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
	},
	getTime (t = Date.now(), f) {
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
	},
	log (type = 'other') {
		fs.writeFile(path + 'logs/' + this.getTime(Date.now(), 1) + '-' + type + '.txt', this.getTime(), e => {})
	},
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
	getPhrase (t = '') {
		return axios.get('https://api.imjad.cn/hitokoto/?encode=json&charset=utf-8&cat=' + t)
	},
	loading (key, fn) {
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
	},
	/*
		* 豆瓣id查询
	*/
	doubanQuery (v, fn) {
		axios.get('https://movie.douban.com/j/subject_suggest?q=' + v)
		.then(d => {
			fn && fn(d.data)
		})
	},
	/*
		* 豆瓣详情
	*/
	doubanDetails (v, fn) {
		axios.get('https://movie.douban.com/subject/' + v)
		.then(d => {
			let data = {}
			let x = document.createElement('div')
			x.innerHTML = d.data.replace(/(src=|href=)/g, 'data-src=').replace(/<script("[^"]*"|'[^']*'|[^'">])*>/g, '')
			data.score = x.querySelector('.rating_num').innerText
			data.img = x.querySelector('img[rel="v:image"]').getAttribute('data-src')
			x = x.querySelector('#info').innerHTML.split(/\n/)
			x = x.map(v => {
				return v.replace(/([^\u4e00-\u9fa50-9:])/g, '').replace(/:+/g, ':').replace(/:/, '=')
			})
			x.forEach(v => {
				if (v.indexOf('编剧') !== -1) {
					data.author = v.replace(/[0-9:]+/g, '-').replace('-', '').split('=')[1]
				} else if (v.indexOf('主演') !== -1) {
					data.toStar = v.replace(/[0-9:]+/g, '-').replace('-', '').split('=')[1]
				} else if (v.indexOf('类型') !== -1) {
					data.type = v.replace(/:/g, '-').split('=')[1]
				} else if (v.indexOf('地区') !== -1) {
					data.region = v.split('=')[1]
				} else if (v.indexOf('语言') !== -1) {
					data.language = v.split('=')[1]
				} else if (v.indexOf('首播') !== -1) {
					data.dateRrelease = v.split('=')[1]
				} else if (v.indexOf('季数') !== -1) {
					data.season = v.split('=')[1]
				} else if (v.indexOf('集数') !== -1) {
					data.size = v.split('=')[1]
				} else if (v.indexOf('又名') !== -1) {
					data.msg = v.split('=')[1]
				}
			})
			fn && fn(data)
		})
	},
	/*
	* img
	*/
	getImgBg (v, fn) {
		axios.get('https://picsum.photos/1920/1080/?random' + v)
		.then(d => {
			fn && fn(d.data)
		})
	}
}

export {
	api
}
