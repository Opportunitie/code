<template>
	<view class="content">
		<button type="primary" plain="true" @click="handleDisplayIcon">显示图标</button>
		<view v-if='show' class="icon iconfont icon-biaoqianA01_shouye-21 animate__animated animate__bounce animate__delay-2s" style="font-size: 60upx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				show: false,
			}
		},
		onLoad() {

		},
		methods: {
			handleDisplayIcon(){
				this.show = !this.show
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
