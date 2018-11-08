<template>
	<div class="fx">
		<div>当前状态：{{status}} <button type="button" @click="login">登陆</button></div>
		<div>
			<img :src="img" @load="logs.push('获取验证码成功')">: 
			<input type="text" v-model="imgCode">
			<button type="button" @click="getImg">getIme</button>
		</div>

		<button type="button" @click"cook">cookie</button>

		<div class="logs">
			<p v-for="i in logs">--> {{i}}</p>
		</div>
	</div>
</template>

<script>
const http = require('request').defaults({jar: true})
// const  = request
export default {
	data () {
		return {
			status: '--',
			logs: ['-->'],
			img: '',
			imgCode: '',
			cookie: 'Hm_lvt_806df8bf4f865af1db1c724887359a8c=1541400089,1541470098; Hm_lpvt_806df8bf4f865af1db1c724887359a8c=1541470131; Hm_lvt_4532b50bd635e230f63e966a610afe18=1539053461,1540868681; Hm_lvt_c8bb97be004001570e447aa3e00ff0ad=1539053505,1540868696,1541470079; Hm_lpvt_c8bb97be004001570e447aa3e00ff0ad=1541470085; __jsl_clearance=1541470090.763|0|K2BPlBXdoCQkVA2Vvm6hfFZ8T70%3D; UNAME=17602559809; MEMBER_IDENT=6537384; MEMBER_LEVEL_ID=1; CACHE_VARY=9012897eb2d7d0b2f4d6f06a8d7ac466-7fac2e154ba1fc6e2658a8eba632f45d',
			options: {
				url: 'https://mall.phicomm.com/m/passport-post_login.html',
				method: 'POST',
				json: false,
				form: {
					uname: 17602559809,
					password: 'jiangkai1994',
					forward: 'https://mall.phicomm.com/m/my.html'
				},
				headers: {
					// 'Accept-Encoding': 'gzip, deflate, br',
					'Accept-Language': 'zh-CN,zh;q=0.9',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
					// 'Content-Length': '42',
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
					'Cookie': 'Hm_lvt_806df8bf4f865af1db1c724887359a8c=1541400089,1541470098; Hm_lpvt_806df8bf4f865af1db1c724887359a8c=1541470131; Hm_lvt_4532b50bd635e230f63e966a610afe18=1539053461,1540868681; Hm_lvt_c8bb97be004001570e447aa3e00ff0ad=1539053505,1540868696,1541470079; Hm_lpvt_c8bb97be004001570e447aa3e00ff0ad=1541470085; __jsl_clearance=1541470090.763|0|K2BPlBXdoCQkVA2Vvm6hfFZ8T70%3D; UNAME=17602559809; MEMBER_IDENT=6537384; MEMBER_LEVEL_ID=1; CACHE_VARY=9012897eb2d7d0b2f4d6f06a8d7ac466-7fac2e154ba1fc6e2658a8eba632f45d',
					'Host': 'mall.phicomm.com',
					'Origin': 'https://mall.phicomm.com',
					'Pragma': 'no-cache',
					'Referer': 'https://mall.phicomm.com/m/passport-login.html',
					'Set-jsonstorage': 'jsonstorage',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
					'X-CSRF-TOKEN': '',
					'X-Requested-With': 'XMLHttpRequest'
				}
			}
		}
	},
	created () {
		// console.log(http)
	},
	methods: {
		setDate (url, met = 'POST', data) {
			return {
				url: url,
				method: met,
				// json: true,
				form: data || '',
				headers: {
					'Accept-Language': 'zh-CN,zh;q=0.9',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
					'Cookie': this.cookie,
					'Host': 'mall.phicomm.com',
					'Origin': 'https://mall.phicomm.com',
					'Pragma': 'no-cache',
					'Referer': 'https://mall.phicomm.com/m/passport-login.html',
					'Set-jsonstorage': 'jsonstorage',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
					'X-CSRF-TOKEN': '',
					'X-Requested-With': 'XMLHttpRequest'
				}
			}
		},
		login () {
			this.logs.push('登陆中...')
			http(this.setDate('https://mall.phicomm.com/m/passport-post_login.html', 'POST', {
				uname: 17602559809,
				password: 'jiangkai1994',
				forward: 'https://mall.phicomm.com/m/my.html'
			}), (er, res, body) => {
				console.log(er, res, body)
				this.logs.push('登陆状态：' + body.success)
				if (body.success === '登陆成功') {}
			})
		},
		vc () {
			// post https://mall.phicomm.com/vclist-vc_info.html?v343
		},
		getImg () {
			let j = http.jar()
			http.post({
				jar: j,
				method: 'post',
				url: 'https://mall.phicomm.com/m/vcode-index-passport6537384.html',
					'encoding': null,
					headers: {
					'Accept-Language': 'zh-CN,zh;q=0.9',
					'Connection': 'keep-alive',
					'Cookie': 'Hm_lvt_806df8bf4f865af1db1c724887359a8c=1541418460,1541423880; Hm_lpvt_806df8bf4f865af1db1c724887359a8c=1541431191; __jsluid=6791bac43d3ea5dbc2a6a40e051dd801; __jsl_clearance=1541431182.308|0|AswMf9mKsSf1M7tShevuJautkpk%3D; _VMC_UID=f6c718f922c30d074fd186f8483ae041; CACHE_VARY=9012897eb2d7d0b2f4d6f06a8d7ac466-e1fbe29478bfe3016b1e59a6be6690fa; _SID=bd2fdf8b7c2be6ee7026339438cd35df; UNAME=17602559809; MEMBER_IDENT=6537384; MEMBER_LEVEL_ID=1',
					'Host': 'mall.phicomm.com',
					'Referer': 'https://mall.phicomm.com/m/cart.html',
					'Upgrade-Insecure-Requests': '1',
					'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36'
				}
			}, (e, r, d) => {
				console.log(e, r, d)
				console.log(j.getCookieString(r), j.getCookies(r), r.request.originalCookieHeader)
				this.img = 'data:image/jpeg;base64,' + d.toString('base64')
			})
		},
		cook () {
			// let j = http.jar()
			// http({
   //      	  	jar: j,
   //      	  	method: 'post',
   //      	  	url: 'https://mall.phicomm.com/m/vcode-index-passport6537384.html',
   //      	  	headers: {
   //      	  		'Accept-Language': 'zh-CN,zh;q=0.9',
   //      	  		'Connection': 'keep-alive',
   //      	  		// 'Cookie': '','Host': 'mall.phicomm.com',
   //      	  		'Referer': 'https://mall.phicomm.com/m/cart.html',
   //      	  		'Upgrade-Insecure-Requests': '1',
   //      	  	  	'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36'
   //      	  	}}, (e, r, d) => {
   //      	  		console.log(e, r, d)
   //      	  		console.log(j.getCookieString(r), j.getCookies(r), r.request.originalCookieHeader)
   //      	})
		}
	}
}
</script>

<style lang="scss">
.fx{
	width: 80%;
	margin: 30px auto;
	background: #fefefe;
	.logs{
		width: 100%;
		height: 300px;
		overflow: auto;
		margin: 50px auto;
		background: #eee;
		font-size: 12px;
	}
}
</style>