Feature: Cards Page
  As a logged-in bank customer
  I want to view my card information and recent transactions
  So that I can monitor my card details and spending activity

  Background:
    Given the user is signed in with valid credentials

  # -----------------------------------------------------------
  # Happy Path
  # -----------------------------------------------------------

  Scenario: User sees a loading indicator while card data is being fetched
    When the user navigates to the Cards page
    Then a loading indicator with the message "Loading cards..." is displayed

  Scenario: User views their card details after data has loaded
    Given the Cards page data has finished loading
    When the user views the Cards page
    Then the page title "Cards" is displayed
    And the card number "5244 2150 8252 ****" is shown
    And the card holder name "CENK SARI" is shown
    And the card validity date "10 / 30" is shown
    And the card CVC "824" is shown

  Scenario: User views their card balance and spending limit
    Given the Cards page data has finished loading
    When the user views the Cards page
    Then the card balance "€ 783.45" is displayed
    And the card spending limit "€ 1250.00" is displayed

  Scenario: User sees the transaction history date and total
    Given the Cards page data has finished loading
    When the user views the Cards page
    Then the transaction history date "May 6" is displayed
    And the transaction history total "-€127.78" is displayed

  # -----------------------------------------------------------
  # Parameterized: Transaction List Details
  # -----------------------------------------------------------

  Scenario Outline: User sees individual transactions in the history list
    Given the Cards page data has finished loading
    When the user views the Cards page
    Then a transaction named "<name>" at "<time>" for "<amount>" is displayed

    Examples:
      | name                 | time  | amount |
      | Coffee               | 15:34 | € 3.25 |
      | Hotel booking        | 12:21 | € 323.26 |
      | Subscription payment | 11:46 | € 9.99 |
      | Water bill           | 10:51 | € 54.21 |
      | Supermarket          | 09:14 | € 78.12 |
      | Tickets              | 09:14 | € 78.12 |
      | Electricty bill      | 07:33 | € 43.55 |

  # -----------------------------------------------------------
  # Failure Path
  # -----------------------------------------------------------

  Scenario: Unauthenticated user is redirected away from the Cards page
    Given the user is not signed in
    When the user attempts to navigate to the Cards page
    Then the user is redirected to the sign-in page

  # -----------------------------------------------------------
  # Edge / Boundary Cases
  # -----------------------------------------------------------

  Scenario: Card number is partially masked for security
    Given the Cards page data has finished loading
    When the user views the Cards page
    Then the card number ends with "****" to protect the full number

  Scenario: Loading indicator disappears after data loads
    When the user navigates to the Cards page
    Then a loading indicator is displayed initially
    And the loading indicator is replaced by card details once data has loaded
