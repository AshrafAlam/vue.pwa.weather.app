<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://mvp.microsoft.com/en-us/PublicProfile/37586"
        target="_blank">Ashraf Alam</a>, made with
      <v-icon
        color="tertiary"
        size="17">mdi-heart</v-icon>
      for a better web
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'Ashraf Alam', Link: 'https://mvp.microsoft.com/en-us/PublicProfile/37586' },
      { name: 'Github', Link: 'https://github.com/AshrafAlam' },
      { name: 'Stackoverflow', Link: 'https://stackoverflow.com/users/79739/ashraf-alam' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
