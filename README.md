# Salesforce Development Project 2: Create an Org SFDC
 
## Context and objectives

The second project consisted of setting up metadata, creating Apex classes to handle a concrete business logic, and developing a
complete Lightning Web Component (LWC).

## Main features 

Complete & responsive custom LWC OpportunityItem datable:
-Adaptative CSS styling
-Custom delete record feature
-Record viewing feature
-End-user guidance through modals 

## Considerations & Improvements

I particularly focused on improving the responsiveness of the LWC and making it user-friendly with modals and adaptive CSS styling.
A good understanding of the business logic of some SFDC standard objects was also important to ensure the project aligns with standard platform functionalities. 
Code readability was improved compared to the previous project, although there is still room for refactoring.
Error handling is also a point that I seeked to improve during the next projects. 

## Installation & Configuration

Run the commands below to test the project in your org:

git clone https://github.com/tonprofil/ton-projet.git
sfdx force:source:push -u DevHub
sfdx force:apex:test:run

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## Commit Convention (Gitmoji)

This project uses Gitmoji for an easy-to-read and structured Git history.

| Emoji | Commit type | Description |
|-------|----------------|-------------|
| ✨ `:sparkles:` | feat | Nouvelle feature (LWC, Apex, etc.) |
| 🐛 `:bug:` | bug fix |
| 📝 `:memo:` | docs | Adding or updating documentation (README, ApexDoc) |
| ♻️ `:recycle:` | refactor | Code refactoring without changing functionality |
| 💄 `:lipstick:` | style | Formatting, indentation, comments |
| ✅ `:white_check_mark:` | test | Add or update unit tests |
| 🚀 `:construction_worker:`| ci | Deploy, CI/CD pipeline |
| 🔧 `:wrench:` | chore | Maintenance, scripts, configuration |

## Contact 

Author : Clément Glodas
📧 [clément.glodas@example.com](mailto:clement.glodas@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/cl%C3%A9ment-glodas-8aa4a9190/)
📂 [Portfolio](https://github.com/Clemz68)