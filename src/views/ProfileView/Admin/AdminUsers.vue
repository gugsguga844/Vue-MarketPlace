<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import FormInput from '@/components/FormInput.vue';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
import ListTable from '@/components/ListTable.vue';

const rows = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Moderator',
    status: 'Ativo',
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Moderator',
    status: 'Ativo',
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Moderator',
    status: 'Ativo',
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Moderator',
    status: 'Ativo',
  },
]
</script>

<template>
  <form class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4 mb-4">
    <ProfileCardTitle
      profileCardTitle="Adicionar Novo Usuário Moderador"
        profileCardDescription="Adicione novos usuários moderadores ao sistema."
    />
    <div class="row">
      <div class="col-md-6">
        <FormInput
          input-for="Nome"
          input-type="text"
          form-label="Nome Completo"
          input-placeholder="Nome do moderador"
        />
      </div>
      <div class="col-md-6">
        <FormInput
          input-for="Email"
          input-type="email"
          form-label="E-mail"
          input-placeholder="Email do usuário"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <FormInput
          input-for="Senha"
          input-type="password"
          form-label="Senha"

          input-placeholder="Senha do usuário"
        />
      </div>
      <div class="col-md-6">
        <FormInput
          input-for="Confirmar Senha"
          input-type="password"
          form-label="Confirmar Senha"
          input-placeholder="Confirmar Senha do usuário"
        />
      </div>
    </div>

    <div class="buttonDiv d-flex justify-content-end">
      <ButtonComponent button-type="submit" button-style="buttonBlack smallRadius" button-text="Cadastrar Usuário" />
    </div>
  </form>

  <div class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4">
    <ProfileCardTitle profile-card-title="Gerenciar Moderadores" profile-card-description="Gerencie os moderadores do sistema." />
    <ListTable
      :headers="['Nome', 'E-mail', 'Papel', 'Status']"
      :rows="rows"
    />
  </div>


</template>