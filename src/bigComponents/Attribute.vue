<template>
	<div class="modal" v-if="visible">
		<div class="modal-overlay" @click="closeModal"></div>
		<div class="modal-content">
			<!-- Your content goes here -->
      STUFF
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LargeModal',
		props: {
			visible: {
				type: Boolean,
				required: true
			}
		},
		methods: {
			closeModal() {
				this.$emit('close');
			}
		}
	}
</script>

<style scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.modal-content {
	background-color: #fff;
	border-radius: 5px;
	padding: 20px;
	max-width: 80%;
	max-height: 80%;
	overflow-y: auto;
}
</style>

