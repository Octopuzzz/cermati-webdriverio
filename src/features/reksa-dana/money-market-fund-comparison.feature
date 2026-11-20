@reksa-dana
Feature: Compare Reksa Dana Pasar Uang (money market) funds
  As an investor on Cermati
  I want to filter money market funds and compare them side by side
  So that I can choose the product that suits me

  @e2e
  Scenario: Compare the first two Syariah money market funds from the product list
    Given I am on the Cermati homepage
    When I expand the "Investasi" section
    Then I should see "Emas Digital" and "Reksa Dana" in the "Investasi" section
    When I click "Buka" on "Reksa Dana"
    Then I should be on the Reksa Dana landing page
    When I open the "Pasar Uang" category
    Then I should see the money market fund list
    When I filter the funds by "Syariah"
    And I start comparing funds
    And I select the first 2 funds to compare
    And I submit the comparison
    Then I should be on the fund comparison page with 2 funds
    And every compared fund should be a Syariah money market fund

  @comparison @smoke
  Scenario: Comparison page displays the selected conventional money market funds
    Given I open the fund comparison page with these funds:
      | slug                                       |
      | henan-ultima-money-market-hp002mmcultimm00 |
      | setiabudi-dana-pasar-uang-sim02mmcsdpasu00 |
      | insight-retail-cash-fund-iim02mmcircash00  |
    Then I should be on the fund comparison page with 3 funds
    And every compared fund should be a conventional money market fund
    And I should see these fund names:
      | name                      |
      | Ultima Money Market       |
      | Setiabudi Dana Pasar Uang |
      | Insight Retail Cash Fund  |
