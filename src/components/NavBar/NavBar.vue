<template>
  <!-- Navigation bar for the desktop version at the top of the page. -->
  <header class="headerDesktop">
      <nav class="desktopNav">
        <RouterLink :to="{name: HOME_PAGE}">
          <img alt="Logo" class="logo" src="@/assets/logo.png" width="45" height="45" />
        </RouterLink>
        <RouterLink :to="{name: HOME_PAGE}">Houses</RouterLink>
        <RouterLink :to="{name: ABOUT_PAGE}">About</RouterLink>
      </nav>
  </header>

  <!-- Navigation bar for mobile version at the bottom of the page. -->
  <nav class="mobileNav">
    <RouterLink :to="{name: HOME_PAGE}">
      <img alt="House icon" class="navIcon navIcon--inactive" src="@/assets/mobile_navigation_home.png" />
      <img alt="House icon" class="navIcon navIcon--active" src="@/assets/mobile_navigation_home_active.png" />
    </RouterLink>
    <RouterLink :to="{name: ABOUT_PAGE}">
      <img alt="Information icon" class="navIcon navIcon--inactive" src="@/assets/mobile_navigation_info.png" />
      <img alt="Information icon" class="navIcon navIcon--active" src="@/assets/mobile_navigation_info_active.png" />
    </RouterLink>
  </nav>
</template>

<script setup>
  import { HOME_PAGE, ABOUT_PAGE } from '@/router';
</script>
<style scoped>
  .headerDesktop {
    display: none;
  }

  .desktopNav {
    max-width: 1440px;
    padding: 16px 165px 16px 165px;
    margin: auto;
    display: flex;
    align-items: center;
    gap: 64px;
  }

  .logo {
    display: block;
  }

  nav {
    font-size: var(--header-menu);
  }

  nav a.router-link-active {
    font-weight: var(--bold);
    color: var(--text-primary);
  }

  nav a.router-link-active:hover {
    background-color: transparent;
  }

  a.router-link-active .navIcon--inactive{
    display: none;
  }

  a.router-link-active .navIcon--active{
    display: block;
  }

  a .navIcon--inactive{
    display: block;
  }

  a .navIcon--active{
    display: none;
  }

  .mobileNav {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: var(--background-2);
      min-height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 1;
  }

  .navIcon {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 1024px) {

    .mobileNav {
      display: none;
  }

  .headerDesktop {
    display: block;
    background-color: var(--background-2);
  }

  }
</style>