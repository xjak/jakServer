<template>
  	<div id="app">
        <img id="bg" src="http://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171122191630_ff8fef.jpg">
  		<div v-if="$route.path!='/'" id="menu">
  			<ul class="clearfix">
  				<li class="left"><a href="/">f5</a></li>
  				<li class="left"><a href="#/music">music</a></li>
  				<li class="left"><a href="#/video">video</a></li>
                <li class="left"><a href="#/fx">fx</a></li>
  			</ul>
  		</div>
  	  	<router-view id="view"></router-view>
  	</div>
</template>

<script>
  export default {
    name: 'project'
  }
</script>

<style lang="scss">
	#app{
		position: relative;
        #bg{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            z-index: -1;
        }
	}
 	#menu{
        // position: fixed;
        left: 0;
        top: 0;
 		width: 100%;
        height: 50px;
        background: rgba(0,0,0,.7);
        ul{
            width: 100%;
            li{
                width: 80px;
                text-align: center;
                a{
                    width: 100%;
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    margin-top: 10px;
                    transition: all .3s;
                }
                a:hover{
                    text-shadow: 0px 0 24px #2f3;
                }
            }
        }
 	}
 	#view{
        // margin-top: 50px;
 		/*position: absolute;
 		left: 10px;
 		right: 0;
 		top: 0;
 		bottom: 0;*/
 	}
</style>
