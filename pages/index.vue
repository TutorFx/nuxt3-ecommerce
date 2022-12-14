<template>
<div>
  <ui-listagem-produtos></ui-listagem-produtos>
</div>
</template>

<style lang="scss">
  .hero{
    height: 560px;

    grid-template-areas: "info foto";
    grid-template-columns: 50% 50%;
    
    gap: 1rem;
    .info{
      grid-area: info;
    }
    .foto{
      grid-area: foto;  
      img{
        @apply object-cover;
        
      }
    }
  }
</style>