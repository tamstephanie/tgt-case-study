# General Project Documentation

## File Structure

The current project structure, starting from within the `src/` folder, is as follows:
- `app/` - React Components, test files, and custom JSS styling files
    - `Context/` - Contexts and Providers to allow easy passing of data to Components
    - `General/` - Reusable Components that should be API- and application-agnostic
    - `Pages/` - Application-specific Components
    - `Utilities/` - Custom classes and reusable helper methods 
    - `WrappersHOCs/` - Wrapper Components and methods and high-order components
- `content/` - Custom images used in the application
- `config/` - Specific configuration files. Currently pertains to custom Jest configurations 
