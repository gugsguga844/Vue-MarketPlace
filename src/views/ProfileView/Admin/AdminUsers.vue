<script setup>
import FormInput from '@/components/FormInput.vue';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
</script>

<template>
  <form class="container-fluid border-1 border-dark-subtle rounded-1">
    <ProfileCardTitle
      profileCardTitle="Adicionar Novo Usuário Moderador"
        profileCardDescription="Adicione novos usuários moderadores ao sistema."
      />
      <div class="row">
        <div class="col-md-6">
          <FormInput
            input-for="Nome"
            input-type="text"
            input-placeholder="Nome do usuário"
          />
        </div>
        <div class="col-md-6">
          <FormInput
            input-for="Email"
            input-type="email"
            input-placeholder="Email do usuário"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <FormInput
            input-for="Senha"
            input-type="password"
            input-placeholder="Senha do usuário"
          />
        </div>
        <div class="col-md-6">
          <FormInput
            input-for="Confirmar Senha"
            input-type="password"
            input-placeholder="Confirmar Senha do usuário"
          />
        </div>
      </div>
      <ButtonComponent
        button-style="buttonBlack smallRadius"
        button-text="Adicionar Usuário"
      />



  </form>

</template>