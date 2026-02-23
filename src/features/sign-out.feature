Feature: Sign out from profile page
  As a logged-in user
  I want to sign out from the profile page
  So that my session ends and I am returned to the login page

  # -------------------------------------------------------------------
  # Playbook Step 1 – Core Behavior
  #   Actor:            Logged-in user
  #   Intent:           Sign out of the application
  #   Business outcome: Session ends; user sees the login page
  #
  # Playbook Step 2 – Acceptance Criteria
  #   Precondition:     User is authenticated and on the profile page
  #   Action:           User clicks the "Sign out" link
  #   Expected outcome: User is redirected to the login page
  #
  # Playbook Step 3 – Scenarios are listed below
  # -------------------------------------------------------------------

  Background:
    Given the user is logged in

  # ---- Happy path ----
  Scenario: Successful sign out redirects to the login page
    Given the user is on the profile page
    When the user clicks "Sign out"
    Then the user should be redirected to the login page
    And the login form should be displayed

  # ---- Failure path ----
  Scenario: Sign out fails due to a network error
    Given the user is on the profile page
    And the network connection is unavailable
    When the user clicks "Sign out"
    Then the user should see an error message indicating sign out failed
    And the user should remain on the profile page

  # ---- Edge case: browser back button after sign out ----
  Scenario: Pressing back after sign out does not restore the session
    Given the user is on the profile page
    When the user clicks "Sign out"
    And the user is redirected to the login page
    And the user presses the browser back button
    Then the user should not be returned to the profile page
    And the user should remain on the login page

  # ---- Edge case: unauthenticated access to profile ----
  Scenario: Unauthenticated user cannot access the profile page
    Given the user is not logged in
    When the user attempts to navigate to the profile page
    Then the user should be redirected to the login page

  # ---- Edge case: sign out link visibility ----
  Scenario: Sign out link is visible on the profile page
    Given the user is on the profile page
    Then the "Sign out" link should be visible

  # -------------------------------------------------------------------
  # Playbook Step 5 – Parameterization
  #   No repeated patterns with varying inputs were identified.
  #   Each scenario validates a distinct behavioral outcome,
  #   so Scenario Outline is not needed here.
  #
  # Playbook Step 6 – Validation
  #   ✓ Each scenario is understandable by non-engineers
  #   ✓ Every "Then" statement is objectively verifiable
  #   ✓ Steps describe behavior, not implementation
  #   ✓ Scenarios can be automated cleanly with standard tooling
  # -------------------------------------------------------------------
