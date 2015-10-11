function [J, grad] = costFunctionReg(theta, X, y, lambda)
%COSTFUNCTIONREG Compute cost and gradient for logistic regression with regularization
%   J = COSTFUNCTIONREG(theta, X, y, lambda) computes the cost of using
%   theta as the parameter for regularized logistic regression and the
%   gradient of the cost w.r.t. to the parameters. 

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;
grad = zeros(size(theta));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta.
%               You should set J to the cost.
%               Compute the partial derivatives and set grad to the partial
%               derivatives of the cost w.r.t. each parameter in theta
predictions = X * theta;            % predictions of hypothesis on all m training examples
predictions = sigmoid(predictions);            % predictions of hypothesis on all m training examples
Z = ones(m, 1);
theta1 = theta;
theta1(1) = 0;


J = ((-(y' * log(predictions)) - (Z - y)' * log(Z - predictions)) / m) + (lambda / (2 * m)) * sum(sum(theta1.^2));

%% ==================================================================
grad0 = (X' * (predictions - y)) / m;


grad = (X' * (predictions - y)) / m + lambda * theta / m; 
grad(1) = grad0(1);
% =============================================================

end
