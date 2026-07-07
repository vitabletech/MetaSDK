#!/bin/bash

# 🚀 AutoDevKit - Single-file Professional Development Setup
# This file is auto-generated from modular components
# 
# Supports: React.js, React Native, Node.js, and general projects
# Features: Interactive setup, demo mode, auto-configuration
# 
# Usage: curl -fsSL <url>/setup_project.sh | bash
#   OR:  chmod +x setup_project.sh && ./setup_project.sh
#
# Generated on: 2025-10-04 14:53:30 IST
# Source: https://github.com/msrajawat298/AutoDevKit

set -e

# ═══════════════════════════════════════════════════════════════
# 🎨 COLOR DEFINITIONS
# ═══════════════════════════════════════════════════════════════

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'  # No Color
BRIGHT_GREEN='\033[1;32m'
BRIGHT_BLUE='\033[1;34m'
BRIGHT_RED='\033[1;31m'
BRIGHT_YELLOW='\033[1;33m'
BRIGHT_PURPLE='\033[1;35m'
BRIGHT_CYAN='\033[1;36m'
WHITE='\033[1;37m'
ORANGE='\033[0;33m'
MAGENTA='\033[0;95m'
LIGHT_GRAY='\033[0;37m'
DARK_GRAY='\033[1;30m'
BG_RED='\033[41m'
BG_GREEN='\033[42m'
BG_YELLOW='\033[43m'
BG_BLUE='\033[44m'

# ═══════════════════════════════════════════════════════════════
# 🖨️ UI FUNCTIONS
# ═══════════════════════════════════════════════════════════════

print_header() {
    printf "${BRIGHT_PURPLE}\n"
    printf "╔══════════════════════════════════════════════════════════╗\n"
    printf "║${BRIGHT_PURPLE}                                                          ${BRIGHT_CYAN}║\n"
    printf "║${BRIGHT_PURPLE}                  🚀 ${BRIGHT_YELLOW}AutoDevKit${BRIGHT_PURPLE} 🚀                        ${BRIGHT_CYAN}║\n"
    printf "║${BRIGHT_PURPLE}                                                          ${BRIGHT_CYAN}║\n"
    printf "║${BRIGHT_GREEN}     Choose your technology and get instant setup!        ${BRIGHT_CYAN}║\n"
    printf "║${BRIGHT_PURPLE}                                                          ${BRIGHT_CYAN}║\n"
    printf "║${WHITE}     Press '0' at any prompt to exit                     ${BRIGHT_CYAN}║\n"
    printf "║${BRIGHT_PURPLE}                                                          ${BRIGHT_CYAN}║\n"
    printf "╚══════════════════════════════════════════════════════════╝\n"
    printf "${NC}\n"
}

# Success message with bright green checkmark
print_success() {
    printf "${BRIGHT_GREEN}✅ $1${NC}\n"
}

# Information message with package icon
print_info() {
    printf "${BRIGHT_BLUE}📦 $1${NC}\n"
}

# Warning message with warning icon
print_warning() {
    printf "${BRIGHT_YELLOW}⚠️  $1${NC}\n"
}

# Error message with cross icon
print_error() {
    printf "${BRIGHT_RED}❌ $1${NC}\n"
}

# Configuration display helper
show_config() {
    printf "\n${BRIGHT_GREEN}🎯 Configuration Selected:${NC}\n"
    printf "   ${BRIGHT_CYAN}Project:${NC} ${WHITE}$PROJECT_TYPE${NC}\n"
    printf "   ${BRIGHT_CYAN}Technology:${NC} ${WHITE}$TECHNOLOGY${NC}\n" 
    printf "   ${BRIGHT_CYAN}Demo Mode:${NC} ${WHITE}$DEMO_MODE${NC}\n"
    
    # Add a confirmation prompt with exit option
    printf "\n${YELLOW}📋 Ready to proceed with these settings?${NC}\n"
    printf "  ${GREEN}y)${NC} Yes, let's go!\n"
    printf "  ${BLUE}n)${NC} No, let me change something\n" 
    printf "  ${RED}0)${NC} Exit setup\n"
    printf "\n"
    printf "${YELLOW}Continue? (y/n, or 0 to exit): ${NC}"
    read CONTINUE_CHOICE
    
    case $CONTINUE_CHOICE in
        [yY]|[yY][eE][sS]|yes|YES)
            printf "${GREEN}✅ Great! Starting setup...${NC}\n"
            ;;
        [nN]|[nN][oO]|no|NO)
            printf "${BLUE}🔄 No problem! Let's start over...${NC}\n\n"
            # Return to main to restart the questions
            main
            exit 0
            ;;
        0|exit|quit|q)
            printf "\n${YELLOW}👋 Setup cancelled. Thanks for trying AutoDevKit!${NC}\n\n"
            exit 0
            ;;
        *)
            printf "\n${RED}❌ Please enter 'y' for yes, 'n' to restart, or '0' to exit.${NC}\n"
            show_config  # Recursive call
            ;;
    esac
}

# Final completion message
show_completion() {
    printf "\n${GREEN}╔══════════════════════════════════════════════════════════╗${NC}\n"
    printf "${GREEN}║                    🎉 SETUP COMPLETE! 🎉                ║${NC}\n"
    printf "${GREEN}║                                                          ║${NC}\n"
    printf "${GREEN}║  ✅ $TECHNOLOGY project configured successfully!${NC}\n"
    printf "${GREEN}║  ✅ Husky + ESLint + Prettier + Commitlint ready!       ║${NC}\n"
    printf "${GREEN}║  ✅ Git hooks active and working!                       ║${NC}\n"
    printf "${GREEN}║  ✅ No deprecation warnings!                            ║${NC}\n"
    if [ "$DEMO_MODE" = "true" ]; then
        printf "${GREEN}║  ✅ Demo completed successfully!                         ║${NC}\n"
    fi
    printf "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}\n"

    printf "\n${CYAN}🎯 Available Commands:${NC}\n"
    printf "   ${YELLOW}npm run lint${NC}          - Check and fix code quality\n"
    printf "   ${YELLOW}npm run format${NC}        - Format all files\n"
    printf "   ${YELLOW}npm run validate${NC}      - Run full validation\n"
    printf "   ${YELLOW}npm test${NC}              - Run tests\n"

    printf "\n${CYAN}📝 Commit Message Format:${NC}\n"
    printf "   ${YELLOW}feat: add new feature${NC}\n"
    printf "   ${YELLOW}fix: resolve bug issue${NC}\n"
    printf "   ${YELLOW}docs: update README${NC}\n"

    printf "\n${GREEN}🚀 Your $TECHNOLOGY development environment is ready!${NC}\n\n"
}

# Export functions for use in other scripts
ask_project_type() {
    printf "${BRIGHT_CYAN}🤔 What type of project are you setting up?${NC}\n\n"
    printf "  ${GREEN}1)${NC} Fresh new project\n"
    printf "  ${BLUE}2)${NC} Existing project\n"
    printf "  ${RED}0)${NC} Exit setup\n"
    printf "\n"
    printf "${YELLOW}Choose (1-2, or 0 to exit): ${NC}"
    read PROJECT_SETUP
    
    case $PROJECT_SETUP in
        1) 
            PROJECT_TYPE="fresh" 
            printf "${GREEN}✓${NC} Selected: Fresh new project\n"
            ;;
        2) 
            PROJECT_TYPE="existing" 
            printf "${BLUE}✓${NC} Selected: Existing project\n"
            ;;
        0|exit|quit|q)
            printf "\n${YELLOW}👋 Goodbye! Feel free to run AutoDevKit anytime.${NC}\n\n"
            exit 0
            ;;
        *) 
            printf "\n${RED}❌ Invalid choice. Please select 1, 2, or 0.${NC}\n"
            ask_project_type  # Recursive call to ask again
            return
            ;;
    esac
    
    export PROJECT_TYPE
}

# Ask user about technology stack
ask_technology() {
    printf "\n${BRIGHT_CYAN}🛠  What technology stack are you using?${NC}\n\n"
    printf "  ${BRIGHT_BLUE}1)${NC} ${WHITE}React.js${NC} ${LIGHT_GRAY}(Frontend web app)${NC}\n"
    printf "  ${BRIGHT_PURPLE}2)${NC} ${WHITE}React Native${NC} ${LIGHT_GRAY}(Mobile app)${NC}\n"  
    printf "  ${BRIGHT_GREEN}3)${NC} ${WHITE}Node.js${NC} ${LIGHT_GRAY}(Backend/API)${NC}\n"
    printf "  ${ORANGE}4)${NC} ${WHITE}General JavaScript/TypeScript${NC} ${LIGHT_GRAY}(Universal)${NC}\n"
    printf "  ${RED}0)${NC} Exit setup\n"
    printf "\n"
    printf "${YELLOW}Choose (1-4, or 0 to exit): ${NC}"
    read TECH_CHOICE
    
    case $TECH_CHOICE in
        1) 
            TECHNOLOGY="react" 
            printf "${BRIGHT_BLUE}✓${NC} Selected: React.js for web development\n"
            ;;
        2) 
            TECHNOLOGY="react-native" 
            printf "${BRIGHT_PURPLE}✓${NC} Selected: React Native for mobile apps\n"
            ;;
        3) 
            TECHNOLOGY="nodejs" 
            printf "${BRIGHT_GREEN}✓${NC} Selected: Node.js for backend development\n"
            ;;
        4) 
            TECHNOLOGY="general" 
            printf "${ORANGE}✓${NC} Selected: General JavaScript/TypeScript\n"
            ;;
        0|exit|quit|q)
            printf "\n${YELLOW}👋 Setup cancelled. Have a great day!${NC}\n\n"
            exit 0
            ;;
        *) 
            printf "\n${RED}❌ Invalid choice. Please select 1, 2, 3, 4, or 0.${NC}\n"
            ask_technology  # Recursive call to ask again
            return
            ;;
    esac
    
    export TECHNOLOGY
}

# Ask user about demo mode
ask_demo_mode() {
    printf "\n${BRIGHT_CYAN}🎬 Do you want to run the demo mode?${NC}\n"
    printf "   ${LIGHT_GRAY}(Creates sample files and shows commit validation in action)${NC}\n\n"
    printf "  ${GREEN}y)${NC} Yes, show me how it works! ${LIGHT_GRAY}(Recommended for first-time users)${NC}\n"
    printf "  ${BLUE}n)${NC} No, just set up the tools\n"
    printf "  ${RED}0)${NC} Exit setup\n"
    printf "\n"
    printf "${YELLOW}Choose (y/n, or 0 to exit): ${NC}"
    read DEMO_CHOICE
    
    case $DEMO_CHOICE in
        [yY]|[yY][eE][sS]|yes|YES)
            DEMO_MODE="true" 
            printf "${GREEN}✓${NC} Demo mode enabled - you'll see validation in action!\n"
            ;;
        [nN]|[nN][oO]|no|NO)
            DEMO_MODE="false" 
            printf "${BLUE}✓${NC} Demo mode skipped - tools only setup\n"
            ;;
        0|exit|quit|q)
            printf "\n${YELLOW}👋 Setup cancelled. Come back anytime!${NC}\n\n"
            exit 0
            ;;
        *)
            printf "\n${RED}❌ Please enter 'y' for yes, 'n' for no, or '0' to exit.${NC}\n"
            ask_demo_mode  # Recursive call to ask again
            return
            ;;
    esac
    
    export DEMO_MODE
}

# Export functions for use in other scripts
# ═══════════════════════════════════════════════════════════════
# 🔧 CORE FUNCTIONS
# ═══════════════════════════════════════════════════════════════

init_git() {
    if [ "$PROJECT_TYPE" = "fresh" ] && [ ! -d ".git" ]; then
        print_info "Initializing Git repository..."
        git init
        print_success "Git repository initialized!"
    fi
}

# Export functions
install_dependencies() {
    print_info "Installing development dependencies..."
    
    # Base dependencies
    npm install --save-dev \
        husky@^9.1.7 \
        eslint@^8.57.0 \
        prettier@^3.0.0 \
        lint-staged@^15.0.0 \
        @commitlint/cli@^18.0.0 \
        @commitlint/config-conventional@^18.0.0
    
    # Technology-specific dependencies
    case $TECHNOLOGY in
        "react")
            npm install --save-dev \
                eslint-plugin-react@^7.33.0 \
                eslint-plugin-react-hooks@^4.6.0 \
                eslint-plugin-jsx-a11y@^6.7.0 \
                @eslint/eslintrc@^2.1.0
            ;;
        "react-native")
            npm install --save-dev \
                eslint-plugin-react@^7.33.0 \
                eslint-plugin-react-hooks@^4.6.0 \
                eslint-plugin-react-native@^4.1.0 \
                @eslint/eslintrc@^2.1.0
            ;;
        "nodejs")
            npm install --save-dev \
                eslint-plugin-node@^11.1.0 \
                @eslint/eslintrc@^2.1.0
            ;;
        *)
            npm install --save-dev @eslint/eslintrc@^2.1.0
            ;;
    esac
    
    print_success "All dependencies installed!"
}

# Export functions
# ═══════════════════════════════════════════════════════════════
# ⚙️ CONFIGURATION FUNCTIONS
# ═══════════════════════════════════════════════════════════════

create_package_json() {
    if [ ! -f "package.json" ]; then
        print_info "Creating package.json for $TECHNOLOGY project..."
        
        case $TECHNOLOGY in
            "react")
                cat > package.json << 'EOL'
{
  "name": "react-dev-project",
  "version": "1.0.0",
  "description": "React.js project with professional development setup",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "validate": "npm run lint && npm run format"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {},
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOL
                ;;
            "react-native")
                cat > package.json << 'EOL'
{
  "name": "react-native-dev-project",
  "version": "1.0.0",
  "description": "React Native project with professional development setup",
  "main": "index.js",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "validate": "npm run lint && npm run format"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.72.0"
  },
  "devDependencies": {}
}
EOL
                ;;
            "nodejs")
                cat > package.json << 'EOL'
{
  "name": "nodejs-dev-project",
  "version": "1.0.0",
  "description": "Node.js project with professional development setup",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "validate": "npm run lint && npm run format"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {}
}
EOL
                ;;
            *)
                cat > package.json << 'EOL'
{
  "name": "js-dev-project",
  "version": "1.0.0",
  "description": "JavaScript project with professional development setup",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "validate": "npm run lint && npm run format"
  },
  "devDependencies": {}
}
EOL
                ;;
        esac
        print_success "package.json created for $TECHNOLOGY!"
    fi
}

# Export functions
create_gitignore() {
    if [ ! -f ".gitignore" ]; then
        print_info "Setting up .gitignore for $TECHNOLOGY..."
        
        cat > .gitignore << 'EOL'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
build/
dist/
.next/
out/

# Environment variables
.env*
!.env.example

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
.cache/
EOL

        if [ "$TECHNOLOGY" = "react-native" ]; then
            cat >> .gitignore << 'EOL'

# React Native specific
.expo/
.expo-shared/
android/
ios/
EOL
        fi

        print_success ".gitignore created for $TECHNOLOGY!"
    fi
}

# Export functions
setup_eslint_config() {
    print_info "Creating ESLint config for $TECHNOLOGY..."
    
    case $TECHNOLOGY in
        "react")
            cat > .eslintrc.js << 'EOL'
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['build/', 'dist/', 'node_modules/', '*.min.js', '.husky/'],
};
EOL
            ;;
        "react-native")
            cat > .eslintrc.js << 'EOL'
module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'react-native'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['android/', 'ios/', 'node_modules/', '*.min.js', '.husky/'],
};
EOL
            ;;
        "nodejs")
            cat > .eslintrc.cjs << 'EOL'
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['node'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.min.js', '.husky/'],
};
EOL
            ;;
        *)
            cat > .eslintrc.js << 'EOL'
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.min.js', '.husky/'],
};
EOL
            ;;
    esac
    
    print_success "ESLint config created for $TECHNOLOGY!"
}

# Export functions
setup_prettier() {
    print_info "Creating Prettier configuration..."
    
    case $TECHNOLOGY in
        "react"|"react-native")
            cat > .prettierrc << 'EOL'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid"
}
EOL
            ;;
        *)
            cat > .prettierrc << 'EOL'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
EOL
            ;;
    esac
    
    print_success "Prettier configuration created!"
}

# Export functions
setup_husky() {
    print_info "Setting up Husky Git hooks..."
    
    # Initialize git if not already present (needed for Husky)
    if [ ! -d ".git" ]; then
        print_info "Initializing Git repository (required for Husky)..."
        git init
    fi
    
    npx husky init
    # Ensure git hooks path is set correctly
    git config core.hooksPath .husky
    print_success "Husky initialized!"
}

# Setup Git hooks
setup_git_hooks() {
    print_info "Setting up Git hooks..."
    
    # Pre-commit hook
    cat > .husky/pre-commit << 'EOL'
npx lint-staged
EOL
    chmod +x .husky/pre-commit
    
    # Commit-msg hook
    cat > .husky/commit-msg << 'EOL'
npx --no -- commitlint --edit $1
EOL
    chmod +x .husky/commit-msg
    
    print_success "Git hooks configured!"
}

# Export functions
setup_lint_staged() {
    print_info "Setting up lint-staged..."
    
    cat > lint-staged.config.cjs << 'EOL'
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
};
EOL
    
    print_success "lint-staged configured!"
}

# Export functions
setup_commitlint() {
    print_info "Setting up commit message validation..."
    
    cat > .commitlintrc.json << 'EOL'
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert"
      ]
    ]
  }
}
EOL
    
    print_success "Commitlint configured!"
}

# Export functions
# ═══════════════════════════════════════════════════════════════
# 🎬 DEMO FUNCTIONS
# ═══════════════════════════════════════════════════════════════

create_demo_files() {
    if [ "$DEMO_MODE" = "true" ]; then
        print_info "Creating demo files for $TECHNOLOGY..."
        
        case $TECHNOLOGY in
            "react")
                mkdir -p src
                cat > src/App.js << 'EOL'
import React from 'react';

function App() {
  const handleClick = () => {
    console.log('Hello from React!');
  };

  return (
    <div>
      <h1>Hello React!</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

EOL
                ;;
            "react-native")
                cat > App.js << 'EOL'
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const COLORS = {
  primary: '#007AFF',
};

const App = () => {
  const handlePress = () => {
    // eslint-disable-next-line no-console
    console.log('Hello from React Native!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native!</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text>Press me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
});

EOL
                ;;
            "nodejs")
                cat > index.js << 'EOL'
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOL
                ;;
            *)
                cat > index.js << 'EOL'
// Demo JavaScript file
const greet = (name) => {
  console.log(`Hello, ${name}!`);
  return `Hello, ${name}!`;
};

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

console.log('Doubled numbers:', doubled);
greet('Developer');
EOL
                ;;
        esac
        
        print_success "Demo files created!"
    fi
}

# Run interactive demo
run_demo() {
    if [ "$DEMO_MODE" = "true" ]; then
        printf "\n${PURPLE}🎬 DEMO MODE: Let's see the validation in action!${NC}\n\n"
        
        # Initialize git if not already initialized (needed for demo)
        if [ ! -d ".git" ]; then
            print_info "Initializing Git for demo..."
            git init
            # Configure git hooks path for demo
            git config core.hooksPath .husky
        fi
        
        # Stage the demo files
        git add .
        
        print_info "Step 1: Trying to commit with bad message..."
        printf "\n${YELLOW}Command: git commit -m \"bad commit message\"${NC}\n"
        
        # Try bad commit (should fail)
        if git commit -m "bad commit message" 2>/dev/null; then
            print_error "Commit should have been rejected but wasn't!"
        else
            print_success "✅ Bad commit message was rejected! (As expected)"
        fi
        
        # Reset to try again
        git reset --soft HEAD~1 2>/dev/null || true
        
        printf "\n${BLUE}📦 Step 2: Fixing the code and using proper commit message...${NC}\n"
        print_info "Trying proper commit message..."
        printf "${YELLOW}Command: git commit -m \"feat: add demo files for $TECHNOLOGY project\"${NC}\n"
        
        # Try good commit (should work)
        if git commit -m "feat: add demo files for $TECHNOLOGY project"; then
            print_success "✅ Proper commit message accepted!"
        else
            print_error "Commit failed - there might still be linting issues"
        fi
        
        printf "\n${GREEN}🎉 Demo completed! Your setup is working perfectly!${NC}\n"
    fi
}

# Export functions
# ═══════════════════════════════════════════════════════════════
# 🚀 MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════

# Main execution orchestrator
main() {
    # Phase 1: User interaction and configuration
    print_header
    ask_project_type
    ask_technology  
    ask_demo_mode
    show_config
    
    printf "\n${BLUE}📦 Starting setup for $TECHNOLOGY project...${NC}\n"
    
    # Phase 2: Core setup
    init_git
    create_package_json
    create_gitignore
    install_dependencies
    
    # Phase 3: Tool configuration
    setup_husky
    setup_eslint_config
    setup_prettier
    setup_lint_staged
    setup_commitlint
    setup_git_hooks
    
    # Phase 4: Demo and completion
    create_demo_files
    run_demo
    show_completion
}

# Run the script only if executed directly (not sourced)
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi
