<template>
  	<div id="app">
  		<div v-if="$route.path!='/'" id="menu">
  			<ul class="clearfix">
  				<li class="left"><a href="/">f5</a></li>
  				<li class="left"><a href="#/music">music</a></li>
  				<li class="left"><a href="#/animation">animation</a></li>
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
	}
 	#menu{
        position: fixed;
        left: 0;
        top: 0;
 		width: 100%;
        height: 50px;
        background: #888;
        ul{
            width: 100%;
            li{
                width: 80px;
                text-align: center;
                a{
                    width: 100%;
                    display: block;
                    color: #fff;
                }
            }
        }
 	}
 	#view{
        margin-top: 50px;
 		/*position: absolute;
 		left: 10px;
 		right: 0;
 		top: 0;
 		bottom: 0;*/
 	}
</style>
