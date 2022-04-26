module.exports = {
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "tsconfig.json"
        ],
        "createDefaultProgram": true
      },
      "extends": [
        "airbnb-base",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:import/typescript"
      ],
      "plugins": ["import", "@typescript-eslint"],
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "no-undef": "off",
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
        "@angular-eslint/no-empty-lifecycle-method": "off",
        "dot-notation": "off",
        "no-useless-constructor": "off",
        "no-empty-function": "off",
        "no-unused-vars": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "import/extensions": [
          "error",
          "ignorePackages",
          {
              "ts": "never"
          }
      ]
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {}
    }
  ],
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  }
};
