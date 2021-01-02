<template>
  <div class="progress-circle">
    <svg
      width="30"
      height="30"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress-background"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        stroke-dasharray="100"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.progress-circle {
  position: relative;
  border-radius: 50%;
  circle {
    border-color: 8px;
    transform-origin: center;
  }
  .progress-background {
    transform: scale(0.9);
  }
  .progress-bar {
    transform: scale(0.9) rotate(-90deg);
  }
}
</style>