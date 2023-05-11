<template>
  <main>
    <PageWrapper>
      <PageTitle class="pageTitle--mobile">About</PageTitle>

      <div class="aboutContainer">
        <SectionTitle>
          About Real Estate House Listing
        </SectionTitle>

        <TextParagraph>
          This web application allows users to view a list of houses, 
          search and filter houses based on price and size, 
          add new listings, as well as edit and delete existing listings. 
          This website would provide users with the ability to easily browse through available housing options, 
          with options to refine their search based on specific criteria. 
          Additionally, it would offer an interface for individuals to add their own listings and manage them as necessary. 
          By enabling these functions, the website can provide a streamlined and efficient means of finding and managing property listings.
        </TextParagraph>
      </div>

      <div class="aboutContainer">
        <SectionTitle>
          Development
        </SectionTitle>

        <DetailsContainer>
          <img alt="Developer Avatar" class="avatarImg" src="@/assets/avatar.jpg" />

          <div class="infoContainer">
            <TextParagraph>By Marina Kenina</TextParagraph>
            <DetailContainer>
              <HouseDetailsIcon alt="Github icon" src="/src/assets/GitHub.png"/>
              <a 
                  href="https://github.com/korvenhasta" 
                  target="_blank"
                  class="aboutLink"
                >
                  Github
                </a>
            </DetailContainer>

            <DetailContainer>
              <HouseDetailsIcon alt="Linkedin icon" src="/src/assets/linkedin_white.png"/>
              <a 
                href="https://www.linkedin.com/in/marina-kenina/" 
                target="_blank"
                class="aboutLink"
              >
                Linkedin
              </a>
            </DetailContainer>
          </div>
        </DetailsContainer>
      </div>

    </PageWrapper>
  </main>
</template>

<script setup>
  import PageWrapper from "@/components/atoms/PageWrapper/PageWrapper.vue";
  import PageTitle from "@/components/atoms/Typography/PageTitle.vue";
  import SectionTitle from "@/components/atoms/Typography/SectionTitle.vue";
  import TextParagraph from "@/components/atoms/Typography/TextParagraph.vue";
  import DetailsContainer from "@/components/atoms/DetailsContainer/DetailsContainer.vue";
  import DetailContainer from "@/components/atoms/DetailsContainer/DetailContainer.vue";
  import HouseDetailsIcon from '@/components/atoms/Icons/HouseDetailsIcon.vue';
</script>

<style scoped>
  .pageTitle--mobile {
    display: block;
    text-align: center;
  }

  .aboutContainer {
    display: flex;
    gap: 8px;
    flex-direction: column;
    margin: 24px 0;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
  }

  .avatarImg {
    width: 100px;
    height: 100%;
    border-radius: 5px;
  }

  .logoImage {
    width: 100px;
  }

  .aboutLink {
    text-decoration: none;
    color: var(--text-hyperlink);
    font-size: var(--link);
  }

  @media screen and (min-width: 1024px) {
    .pageTitle--mobile {
      display: none;
    }

    .aboutContainer {
      gap: 16px;
      margin: 32px 0;
    }

    .logoImage {
      width: 175px;
    }

    .aboutLink {
      color: var(--text-hyperlink);
      font-size: var(--listing-information);
    }

    .avatarImg {
      width: 175px;

    }
  }
</style>
