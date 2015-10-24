Rails.application.routes.draw do
  
  root 'statics#index'

  mount_devise_token_auth_for 'User', at: 'api/auth'

  #Route for additional info path
  	get "/additional_info" => "statics#additional_info"
  
  scope '/api' do

    resources :users, only: [:index, :show, :create, :update, :destroy]

  end


  
end
