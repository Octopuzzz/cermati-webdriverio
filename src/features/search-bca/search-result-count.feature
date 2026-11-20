@search
Feature: Search result category counts
  As a visitor on Cermati
  I want the search result counts to be consistent
  So that I can trust the number of results shown for each category

  @e2e @smoke
  Scenario: Sum of category counts equals the total results for "BCA"
    Given I am on the Cermati homepage
    When I search for "BCA" from the header
    Then I should be on the search result page for "BCA"
    And I should see these search categories:
      | category           |
      | Semua              |
      | Kartu Kredit       |
      | Pinjaman           |
      | Simpanan           |
      | Artikel            |
      | Promo Kartu Kredit |
    And the sum of the category counts should equal the total results
