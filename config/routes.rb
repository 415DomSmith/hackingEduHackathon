Rails.application.routes.draw do
  
  root 'statics#index'

  mount_devise_token_auth_for 'User', at: 'api/auth'




  
end
