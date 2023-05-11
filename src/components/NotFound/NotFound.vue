<template>
  <!-- Displaying image and message when there is nothing to show to the user. -->
  <div class="notFound">
    <img class="searchNothingFoundImg" src="@/assets/img_empty_houses@3x.png"/>
    <p class="bodyMessage">No results found.<br>Please try another keyword.</p>
  </div>
</template>

<script>

</script>

<style scoped>
  .notFound {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }

  .searchNothingFoundImg {
    width: 225px;
  }

  .bodyMessage {
    font-family: var(--font-headings);
    color: var(--text-secondary);
    font-size: var(--empty-message);
    font-weight: var(--medium);
    text-align: center;
  }

  @media screen and (min-width: 1024px) {
    .searchNothingFoundImg {
      width: 350px;
    }

    .bodyMessage {
      font-size: var(--empty-message);
    }
  }

</style>