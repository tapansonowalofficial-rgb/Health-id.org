{ pkgs }: {
  deps = [
    pkgs.nodejs_20
  ];

  env = {
    NODE_ENV = "development";
  };

  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
    ];

    previews = {
      enable = true;

      previews = {
        web = {
          command = [
            "npm"
            "run"
            "dev"
          ];

          manager = "web";
        };
      };
    };
  };
}