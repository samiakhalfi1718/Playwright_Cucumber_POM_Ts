Feature: Authentification

  Scenario: Connexion avec des identifiants valides
    Given l'utilisateur est sur la page de connexion
    When il saisit "standard_user" et "secret_sauce"
    Then il doit être redirigé vers la page d'accueil