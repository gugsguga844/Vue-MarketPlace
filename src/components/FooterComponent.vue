<script setup>
import { Banknote, CreditCard, Facebook, Instagram, RussianRuble, Twitter, Wallet, Wallet2, Youtube } from 'lucide-vue-next';
</script>

<template>
  <div class="container-fluid px-4 bg-black">
    <section class="payments d-flex flex-column align-items-center py-4 gap-4 border-bottom">
      <h3 class="text-white m-0">Formas de Pagamento</h3>
      <ul class="d-flex gap-4 p-0 text-white m-0">
        <li>
          <CreditCard :size="32" />
        </li>
        <li>
          <Wallet :size="32" />
        </li>
        <li>
          <Wallet2 :size="32" />
        </li>
        <li>
          <Banknote :size="32" />
        </li>
        <li>
          <RussianRuble :size="32" />
        </li>
      </ul>
    </section>
    <section class="menus py-5">
      <div class="row">
        <div class="col-6 col-md-3">
          <ul class="d-flex flex-column align-items-center p-0 gap-4">
            <li class="text-white fw-bold">Customer Service</li>
            <li><a href="#" class="text-secondary">Ajuda</a></li>
            <li><a href="#" class="text-secondary">Track Order</a></li>
            <li><a href="#" class="text-secondary">Size Chart</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-3">
          <ul class="d-flex flex-column align-items-center p-0 gap-4">
            <li class="text-white fw-bold">Worry Free Shopping</li>
            <li><a href="#" class="text-secondary">Promo Terms and Exclusions</a></li>
            <li><a href="#" class="text-secondary">Safe Shopping</a></li>
            <li><a href="#" class="text-secondary">Delivery & Shipping</a></li>
            <li><a href="#" class="text-secondary">Return Policy</a></li>
            <li><a href="#" class="text-secondary">Terms & Conditions</a></li>
          </ul>
        </div>
        <div class="col-3">
          <ul class="d-flex flex-column align-items-center p-0 gap-4">
            <li class="text-white fw-bold">Information</li>
            <li><a href="#" class="text-secondary">My Account</a></li>
            <li><a href="#" class="text-secondary">About Us</a></li>
            <li><a href="#" class="text-secondary">Affiliate Program</a></li>
            <li><a href="#" class="text-secondary">Contact Us</a></li>
          </ul>
        </div>
        <div class="col-3">
          <ul class="d-flex flex-column align-items-center p-0 gap-4">
            <li class="text-white fw-bold">Follow Us</li>
            <ul class="d-flex gap-4 p-0">
              <li class="rounded-circle bg-danger p-2"><a href="#" class="text-white"><Facebook /></a></li>
              <li class="rounded-circle bg-danger p-2"><a href="#" class="text-white"><Instagram /></a></li>
              <li class="rounded-circle bg-danger p-2"><a href="#" class="text-white"><Twitter /></a></li>
              <li class="rounded-circle bg-danger p-2"><a href="#" class="text-white"><Youtube /></a></li>
            </ul>
          </ul>
        </div>
      </div>
      <div class="row pt-5">
        <div class="col-12 text-center">
          <ul class="d-flex flex-column align-items-center p-0 gap-4">
            <li class="text-white fw-bold"><h4>Receba nossas ofertas no E-mail</h4></li>
            <form class="border-bottom">
              <input class="p-3" type="email" placeholder="Seu melhor e-mail aqui">
              <button type="submit"><i class="fa-solid fa-arrow-right fa-lg p-3" style="color: #ffffff;"></i></button>
            </form>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #A1A1AA;
}
</style>
