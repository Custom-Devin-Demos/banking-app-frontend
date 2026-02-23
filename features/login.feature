Feature: User Login
  As a banking app user
  I want to log in with my email and password
  So that I can access my home screen and manage my finances

  Background:
    Given the user is on the sign-in page

  # Happy path
  Scenario: Successful login with valid credentials
    Given the user has entered "test@example.com" as the email
    And the user has entered "examplepass" as the password
    When the user presses the "Sign in" button
    Then the user should be redirected to the home screen
    And the home screen should display the account balance

  # Failure paths
  Scenario Outline: Login fails with an invalid email
    Given the user has entered "<email>" as the email
    And the user has entered "examplepass" as the password
    When the user presses the "Sign in" button
    Then the user should see the error message "<error_message>"
    And the user should remain on the sign-in page

    Examples:
      | email            | error_message                      |
      |                  | Email is required                  |
      | notanemail       | Please enter a valid email address |
      | missing@         | Please enter a valid email address |
      | @nodomain.com    | Please enter a valid email address |
      | spaces in@email  | Please enter a valid email address |

  # Edge case
  Scenario: Login with valid email and empty password
    Given the user has entered "test@example.com" as the email
    And the user has left the password field empty
    When the user presses the "Sign in" button
    Then the user should be redirected to the home screen
