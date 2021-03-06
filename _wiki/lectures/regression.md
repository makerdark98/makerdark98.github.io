---
layout  : wiki
title   : Regression Analysis
summary : 2021 Spring
date    : 2021-06-06 14:56:14 +0900
lastmod : 2021-06-20 23:05:24 +0900
tags    : [statistics, lectures]
draft   : false
parent  : lectures
---

## Chapter 1. Introduction
### 1.1 What is regression analysis?
 * Regression analysis a method ofr investigating functional relationships among variables.
 * Relationship is expressed in the form of an equiation or a model connecting the response or dependent variable and one or more explanatory or predictor variables.
 * $ Y = f(X_1, \cdots, X_p) + \epsilon $:
   * where $\epsilon$ is a random error and the funciton $f$ describes the relationship between $Y$ and $X_1, \cdots, X_p$
 * $Y$ is called a response (output, or dependent) variable.
 * $X_1, \cdots, X_p$ are called predictors (explanatory, independent, input) variables, regressors, covariates, factors or carriers.
 * When $f(X_1, \cdots, X_p) = \beta_0 + \beta_1 X_1 + \cdots + \beta_p X_p$, it is called a linear regression model:
   * $ Y = \beta_0 + \beta_1 X_1 + \cdots \beta_p X_p + \epsilon$
   * where $\beta_0, \beta_1, \cdots, \beta_p$ are called the regression coefficients (parameters) to be unknown and estimated.

### 1.2 Hisotry
 * Least squares estimation (LSE) to fit a traight line to 2-dimensional data:
   * Legendre(1805), Gauss(1809)
   * -> Laplace(1810) : CLT and connecting LS method with normality
   * -> Gauss (1822): first part of Gauss-Markov theorem
 * The term of "regression" was coined by F. Galton:
   * Francis Galton (1886), "Regression towards mediocrity in hereditary stature". The journal of the Anthropological Institute of Great Britain and Ireland 15
   * Galton conclude in the paper "it is that the height-deviate of the offspring is, on the average, two-thirds the height-deviate of tis mid-perentage."
 * Yule(1892) and K.Pearson (1903) theoretically formulated the regression analysis for a bivariate normal ditribution.
 * RA Fisher (1922, 1925) released the assumption of the bivariate normality to the conditional normality of response given predictor.
 * George E.P.Box (1979) in his Response Surface Methodology book:
   * "Essentially, all models are wrong, but some are useful."

### 1.4 Procedures of regression analysis
 1. Statement of the problem
 2. Selection of potentially relevant variables
 3. Experimental design and data colelciton
 4. Model specification
 5. Choice of fittin model
 6. Model fitting
 7. Model validation and criticism
 8. Using the model for the intended purpose

#### Various Models
 * Univariate : Only one quantative response variable
 * Multivariate : Two or more quantitative response variables
 * Simple : Only one predictor variable
 * Multiple : two or mor predictor variables
 * Linear : All parameters enter the equation linearly, possibly after transformation of the data
 * Nonlinear : The relationship between the resposne and some of the predictors is nonlinear or some of the parameters appear nonlinearly, but no transformation is possible to make the parameters appear linearly
 * Analysis of variance : All predictors are qualitative variable
 * Analysis of covariance : Some predictors are quantitative variables and others are qualitative variables
 * Logistic : The response variable is qualitative

## Chapter 2. Corrleation analysis and simple linear regression
### 2.1 Covariance and correlation
 * Let $X$ and $Y$ be RVs defined on a population of interest. The vocariance of $X$ and $Y$ is defined by:
   * $Cov(X,Y)=E\{(X-EX)(Y-EY)\} = E(XY) - (EX)(EY)$
 * The sample covariance is the unbaised estimator of $Cov(X,Y)$ and defined as:
   * $\hat {Cov}(X,Y) = \frac{1}{n-1}\sum_{i=1}^n (y_i - \bar y) (x_i - \bar x)$
 * The (population) correlation coefficient is defined by:
   * $\rho = \rho_{xy} = Cor(X,Y) = Cov(\frac{X-EX}{\sigma_X}, \frac{Y - EY}{\sigma_Y})$
 * The sample correlation coefficient is defined by:
   * $\gamma = \gamma_{xy} = \hat {Cor}(X, Y) = \frac{\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y)}{\sqrt{(\sum_{i=1}^n(x_i - \bar x)^2 (\sum_{i=1}^n (y_i - \bar y)^2)}} \\\\ = \frac{1}{n-1}\sum_{i=1}^n \frac{x_i - \bar x}{s_x} \frac{y_i - \bar y)}{s_y}$

### Anscombe's quartet
 * What is the lesson from Anscombe's quartet? The quartet illustration the importance of looking at a set of data graphically before staring to analyze according to a particular type of relationship, and the inadequancy of basic statistic properties for describing relistic datasets.
 * A single extern observation (outlier) may influence the correlation analysis or linear model too much and distort the result.

### 2.2 Simple linear regression
 * $Y = \beta_0 + \beta_1 X + \epsilon$
 * We call $\beta_0$ and $\beta_1$ the regression coefficients (parameters).

### 2.3 Least Squares Estimation (LSE)
 * Sum of squares of the vertical distance:
   * $S(\beta_0, \beta_1) = \sum_{i=1}^n \epsilon_i^2 \\\\ = \sum_{i=1}^n (y_i - \beta_0 - \beta_1 x_i)^2$
 * By differentiating in $\beta_0$ and $\beta_1$, the LSEs are obtained as follows:
   * $\hat \beta_1 = \frac{\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y)}{\sum_{i=1}^n(x_i - \bar x)^2} = \frac{S_{xy}}{S_{xx}}$
   * $\hat \beta_0 = \bar y - \hat \beta_1 \bar x$
 * Relation between the correlation coefficient and the regression coefficient:
   * $\beta_1 = \gamma_{xy} \frac{s_y}{s_x}$

### 2.4 Properties of the LSE
 * Assume $E \epsilon_i = 0, Var(\epsilon_i) = \sigma^2$, and they are independent.:
   * $E \hat \beta_0 = \beta_0$
   * $E \hat \beta_1 = \beta_1$
   * $Var(\hat \beta_0) = \sigma^2 [\frac{1}{n} + \frac{\bar x ^2}{\sum_{i=1}^n (x_i - \bar x)^2}] = \sigma^2 [\frac{1}{n} + \frac{\bar x^2}{S_{xx}}]$
   * $Var(\hat \beta_1) = \frac{\sigma^2}{\sum_{i=1}^n (x_i - \bar x)^2 = \frac{\sigma^2}{S_{xx}}}$
   * $Cov(\hat \beta_0, \hat \beta_1) = - \frac{\bar x}{S_xx} \sigma^2$

 * Assume $\epsilon_i \sim^{i.i.d} N(0, \sigma^2)$:
   * $\hat \beta_0 \sim N(\beta_0, \sigma^2 [\frac{1}{n} + \frac{\bar x^2}{\sum_{i=1}^n (x_i - \bar x)^2}])$
   * $\hat \beta_1 \sim N(\beta_1, \frac{\sigma^2}{\sum_{i=1}^n (x_i - \bar x)^2})$

 * How to estimate (or get) $\sigma$?:
   * If we have a priori knowledge about $\sigma$ from previous studies, then we may use the value of $\sigma$.
   * Otherwise, estimate it:
     * $\hat \sigma^2 = \frac{sum_{i=1}^n e_i^2}{n-2} = \frac{\sum_{i=1}^n (y_i - \hat y_i)^2}{n-2} = \frac{SSE}{n-2} = MSE$
     * The estimator $\hat \sigma^2$ is unbiased for $\sigma^2$, that is, $E \hat \sigma^2 = \sigma^2$
     * Without proof, $\frac{SSE}{\sigma^2} \sim \chi_{n-2}^2$ if $\epsilon_i \sim^{i.i.d} N(0, \sigma^2)$
 * Standard error: the estimate of the standard deviation is called the standard error:
   * $s.e.(\hat \beta_0) = \hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{\sum_{i=1}^n (x_i - \bar x)^2}} \\\\ = \hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{S_{xx}}} = \hat \sigma \sqrt{\frac{\sum x_i ^2}{n S_{xx}}}$
   * $s.e.(\hat \beta_1) = \frac{\hat \sigma}{\sqrt{\sum_{i=1}^n (x_i - \bar x)^2}} = \hat \sigma \sqrt{\frac{1}{S_{xx}}}$

 * Under normality assumption, e.e., $\epsilon_i \sim^{i.i.d} N(0, \sigma^2)$:
   * $\frac{\hat \beta_0 - \beta_0}{\hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{\sum (x_i - \hat x)^2}}} \sim t_{n-2}$
   * $\frac{\hat \beta_1 - \beta_1}{\hat \sigma \frac{1}{\sqrt{\sum (x_i - \bar x)^2}}} \sim t_{n-2}$

 * Hypothesis testing:
   * $H_0 : \beta_0 = \beta_0^*$
   * Test statistic: $T = \frac{\hat \beta_0 - \beta_0^*}{\hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{\sum(x_i - \bar x)^2}}} \sim t_{n-2} \text{ under } H_0$
   * Let $t_0$ be the value of the test statistic with the data
   * Calculate the two-sided p-value by $2P(T > \| t_0 \|)$ and reject H_0 if and only if the p-value <= the level of significance $\alpha$

   * $H_0 : \beta_1 = \beta_1^*$
   * Test statistic: $T = \frac{\hat \beta_1 - \beta_1^*}{\hat \sigma \sqrt{\frac{1}{\sum (x_i - \bar x)^2}}} \sim t_{n-2} \text{ under } H_0$
   * Let $t_1$ be the observed value of the test statistic from the data.
   * Calculate the p-value by $2P(T > \| t_1 \|)$ and reject $H_0$ if and only if the p-value <= the level of significance $\alpha$

 * Confidence intervals:
   * $\hat \beta_0 \pm t_{n-2, \alpha / 2} \times s.e.(\hat \beta_0)$
   * $\hat \beta_1 \pm t_{n-2, \alpha / 2} \times s.e.(\hat \beta_1)$

 * Prediction and predction intervals:
   * Predicted value at $x = x_0$:
     * $\hat y_0 = \hat \beta_0 + \hat \beta_1 x_0$
   * Prediction interval:
     * $\hat y_0 \pm t_{n-2, \alpha / 2} \times s.e.(\hat y_0)$
     * where $s.e.(\hat y_0) = \hat \sigma \sqrt{1 + \frac{1}{n} + \frac{(x_0 - \bar x)^2}{\sum(x_i - \bar x)^2}}$

 * Mean response estimate and confidence limits:
   * Point estimate of the mean response at $x = x)0$:
     * $\hat \mu_0 = \hat \beta_0 + \hat \beta_1 x_0$
   * Confidence interval for $\mu_0$:
     * $\hat \mu \pm t_{n-2, \alpha/2} \times s.e.(\hat \mu_0)$
     * where $s.e.(\hat \mu_0) = \hat \sigma \sqrt{\frac{1}{n} + \frac{(x_0 - \bar x)^2}{\sum(x_i - \bar x)^2}}$

### 2.5 Quality of fit
 1. (objective) Thre greater t test statistic of $H_0 : \beta_1 = 0$ (or the smaller the p-value) is, the stronger the strength of the linear relationship between X and Y is.
 2. (subjective) The scatter plot may be used to discover the strength of the linear relationship.
 3. Examine the scatter plot of Y versus $\hat Y$. The closer the set of points to a straight line, the stronger the linear relationship between Y and X. One can measure the strength of the linear relationship in this graph by computing the correlation coefficient between Y and $\hat Y$,:
   * $Cor(Y, \hat Y) = \| Cor(Y, X) \|$
 4. Furtuermore, in both simple and multiple regressions, $Cor(Y, \hat Y)$ is related to another useful measure of the quality (goodness) of fit of the linear model to the observed data, that is called the coefficient of determination $R^2$.

 * Decomposition of the sum of square erros and the coefficient of determination $R^2$:
   * $\sum(y_i - \bar y)^2 \text{ (SST) } = \sum (\hat y_i - \bar y)^2 \text{ (SSR) } + \sum (y_i - \hat y_i)^2 \text{ (SSE) }$
   * $R^2 = \frac{SSR}{SST} = 1 - \frac{SSE}{SST} = [cor(X, Y)]^2 = [cor(\hat Y, Y)]^2$
   * $R^2 = \frac{\text{Explained variance}}{\text{Total variance}}$
   * $R^2 = \frac{\sum (\hat y_i - \bar y)^2}{\sum {y_i - \bar y)^2}}$

 * The coefficient of determination $R^2$ is a statistical measure of how well the regression line approximates the real data points.
 * $R^2$ does not provide the validty of the regression assumptions
 * We reemphasize that the regression assumptions should be checked before drawing statistical conclusions from the analysis (e.g., conducting tests of hypothesis or constructing confidence or prediction intervals) because the validity of these statistical procedures hinges on the validity of the assumptions.

### 2.6 Simple linear regression with no intercept
 * Model:
   * $Y = \beta_1 X + \epsilon$
 * The LS of $\beta_1$:
   * $\hat \beta_1 = \frac{y_i x_i}{\sum x_i^2}$
 * Fitted values and residuals:
   * $\hat y_i = \hat \beta_1 x_i$
   * $e_i = y_i - \hat y_i$
 * Note that $\sum e_i \not = 0$
 * The standard error of the slope:
   * $s.e.(\hat \beta_1) = \frac{\hat \sigma}{\sqrt{\sum x_i^2}} = \sqrt{\frac{SSE}{(n-1) \sum x_i^2}}$
   * The coefficient of determination:
     * $\sum y_i^2 = \sum \hat y_i ^2 + \sum e_i ^2$
     * $R^2 = \frac{\sum \hat y_i^2}{\sum y_i^2}$

### 2.7 Trivial regression and one sample t test
 * Consider a linear model with zero slope:
   * $Y = \beta_0 + \epsilon$
 * To test $H_0 : \beta_0 = \mu_0$:
   * $t = \frac{\bar y - \mu_0}{s.e.(\bar y)} = \frac{\bar y - \mu_0}{s_y / \sqrt{n}}$

### 2.8 Hypothesis tests about a population correlation coefficient
 * Consider a bivariate randome variable (X, Y). Let $\rho$ be the population correlation of X and Y. We may perform a hypothesis test $H_0: \rho = 0$ using linear regression analysis when (X, Y) has a bivariate normal distribution.:
   * $t = r \sqrt{\frac{n-2}{1 - r ^2}} \sim t_{n-2} \text { under } H_0$
   * $r = \frac{t}{\sqrt{n-2 + t^2}}$
 * A permutation test or bootstrap method can be used without assuming normality
 * Fisher's z-transform can be used under assumption of large sample and normality.:
   * $z(r) = \frac{1}{2} log (\frac{1 + r}{1 - r})$
   * $\sqrt{n - 3} (z(r)-z(\rho_0)) \sim ^{asymp} N(0, 1) \text{ under } H_0 : \rho = \rho_0$
 * Under normality assumption, the exact distribution of the sample correlation coefficient is known

### Appendix
 * (Derivation of the LSEs of the regression coefficients) Consider a simple linear regression model:
   * $Y = \beta_0 + \beta x + \epsilon$
   * Suppose we have an iid randome sample $(x_1, Y_1), \cdots, (x_n, Y_n)$:
     * $Y_i = \beta_0 + \beta_1 x_i + \epsilon_i$
   * The unobservable errors are:
     * $\epsilon_i = Y_i - \beta_0 - \beta_1 x_i$
   * The LSEs are obtained by minimizing the sum of squared erros:
     * $SSE(\beta_0, \beta_1) = \sum_{i=1}^n (Y_i - \beta_0 - \beta_1 x_i)^2$
   * To find the LSEs, we differentiate $SSE(\beta_0, \beta_1)$ in $\beta_0$ and $\beta_1$ and the equations below are called the normal equations:
     * $\frac{\partial SSE(\beta_0, \beta_1)}{\partial \beta_0} = -2 \sum_{i=1}^n (Y_i - \beta_0 - \beta_1 x_i) = 0$
     * $\frac{\partial SSE(\beta_0, \beta_1)}{\partial \beta_1} = -2 \sum_{i=1}^n x_i (Y_i - \beta_0 - \beta_1 x_i) = 0$
   * The normal equations can be written as:
     * $\sum_{i=1}^n Y_i - n \beta_0 - \sum_{i=1}^n x_i \beta_1 = 0$:
       * This equation is equivalent to $\bar Y = \beta_0 + \beta_1 \bar x$
     * $\sum_{i=1}^n x_i Y_i - \sum_{i=1}^n x_i \beta_0 - \sum_{i=1}^n x_i^2 \beta_1 = 0$
   * Substitute $\beta_0 = \bar Y - \beta_1 \bar x$ in the equation:
     * $\sum_{i=1}^n x_i Y_i - \sum_{i=1}^n x_i (\bar Y - \beta_1 \bar x) - \sum_{i=1}^n x_i^2 \beta_1 = 0$
     * $\sum_{i=1}^n x_i (Y_i - \bar Y) - \beta_1 \sum_{i=1}^n x_i (x_i - \bar x) = 0$
     * $\beta_1 = \frac{\sum_{i=1}^n x_i (Y_i - \bar Y)}{\sum_{i=1}^n x_i (x_i - \bar x)} = \frac{\sum_{i=1}^n (x_i - \bar x) (Y_i - \bar Y)}{\sum_{i=1}^n{(x_i - \bar x)(x_i - \bar x)}} = \frac{S_{xy}}{S_{xx}}$
   * Hence, the LSEs are:
     * $\hat \beta_ 1 = \frac{S_{xy}}{S_{xx}}$
     * $\hat \beta_0 = \bar Y - \hat \beta_1 \bar x$

 * (The Expected Values of $\hat \beta_0$ and $\hat \beta_1$) Assume $E \epsilon_i = 0$:
   * $E(\hat \beta_1) = E(\frac{\sum_{i=1}^n (x_i - \bar x)(Y_i - \bar Y)}{S_{xx}}) \\\\ E(\frac{\sum_{i=1}^n(x_i - \bar x)Y_i - \bar Y \sum_{i=1}^n (x_i - \bar x)}{S_{xx}}) \\\\ = \frac{1}{S_{xx}} \sum_{i=1}^n (x_i - \bar x) EY_i \\\\ = \frac{1}{S_{xx}} \sum_{i=1}^n (x_i - \bar x)(\beta_0 + \beta_1 x_i + E(\epsilon_i)) \\\\ = \frac{1}{S_{xx}} \beta_1 \sum_{i=1}^n (x_i - \bar x)^2 \\\\ = \beta_1$
   * $E(\hat \beta_0) = E(\bar Y - \hat \beta_1 \bar x) \\\\ = \frac{1}{n} \sum_{i=1}^n EY_i - E(\hat \beta_1) \bar x \\\\ = \frac{1}{n} \sum_{i=1}^n(\beta_0 + \beta_1 x_i + E(\epsilon_i)) - \beta_1 \bar x \\\\ = \beta_0 + \beta_1 \bar x - \beta_1 \bar x \\\\ = \beta_0$
 * Both $\hat \beta_0$ and $\hat \beta_1$ are unbiased estimators for $\beta_0$ and $\beta_1$, respectively.

 * (The Variances of $\hat \beta_0$ and $\hat \beta_1$ and the convariance of $\hat \beta_0$ and $\hat \beta_1$) Assume $Var(\epsilon_i) = \sigma^2$ and $Cov(\epsilon_i, \epsilon_j) = 0 \text{ for } i \not = j$:
   * $Var(\hat \beta_1) = Var(\frac{\sum_{i=1}^n (x_i - \bar x) Y_i}{S_{xx}}) \\\\ = \frac{1}{S_{xx}^2} \sum_{i=1}^n (x_i - \bar x)^2 Var(Y_i) \\\\ = \frac{1}{S_{xx}^2} \sum_{i=1}^n (x_i - \bar x)^2 Var(\epsilon_i) \\\\ = \frac{\sigma^2}{S_{xx}}$
   * $Var(\hat \beta_0) = Var(\bar Y - \hat \beta_1 \bar x) \\\\ = Var(\bar Y) - 2 \bar x Cov(\bar Y, \hat \beta_1) + \bar x^2 Var(\hat \beta_1) \\\\ = \frac{1}{n} \sigma^2 - 2 \bar x Cov(\bar Y, \hat \beta_1) + \frac{\bar x^2}{S_{xx}} \sigma^2 \\\\ = \sigma^2 (\frac{1}{n} + \frac{\bar x^2}{S_{xx}})$
   * $Cov(\bar Y, \hat \beta_1) = \frac{1}{n} \sum_{i=1}^n \sum_{j=1}^n \frac{(x_j - \bar x)}{S_{xx}} Cov(Y_i, Y_j) \\\\ = \frac{1}{n} \sum_{i=1}^n \sum{j=1}^n \frac{(x_j - \bar x)}{S_{xx}} Cov(\epsilon_i, \epsilon_j) \\\\ = \frac{1}{n} \sum_{i=1}^n \sum_{i=1}^n \frac{(x_i - \bar x)}{S_{xx}} \sigma^2 \\\\ = \frac{\sigma^2}{n S_{xx}} \sum_{i=1}^n (x_i - \bar x) = 0$
 * By using the above,:
   * $Cov(\hat \beta_0, \hat \beta_1) = Cov(\bar Y - \hat \beta_1 \bar x, \hat \beta_1) \\\\ = Cov(\bar Y, \hat \beta_1) - \bar x Cov(\hat \beta_1, \hat \beta_1) \\\\ = 0 - \bar x \frac{\sigma^2}{S_{xx}} \\\\ = - \frac{\bar x}{S_{xx}} \sigma^2$


 * (The expected value of $\hat \sigma^2 = MSE$):
   * $E(MSE) = E(\frac{1}{n-2} \sum_{i=1}^n e_i^2) \\\\ = \frac{1}{n-2} E \{ \sum_{i=1}^n (Y_i - \hat \beta_0 - \hat \beta_1 x_i)^2\} \\\\ = \frac{1}{n-2} E\{ \sum_{i=1}^n ((Y_i - \bar Y) - \hat \beta_1 (x_i - \bar x))^2\} \\\\ = \frac{1}{n-2} E \{ \sum_{i=1}^n (Y_i - \bar Y)^2 - s \sum_{i=1}^n (x_i - \bar x)(Y_i \bar Y)\hat \beta_1 + \sum_{i=1}^n (x_i - \bar x)^2 \hat \beta_1^2\} \\\\ = \frac{1}{n-2} E \{ \sum_{i=1}^n (\beta_1(x_i - \bar x) + (\epsilon_i - \bar \epsilon))^2 - S_{xx} \hat \beta_1 ^2\} \\\\ = frac{1}{n-2} \{ \beta_1 ^2 S_{xx} + 2 \beta_1 \sum_{i=1}^n (x_i - \bar x) E(\epsilon_i) + E\| \sum_{i=1}^n (\epsilon_i - \bar \epsilon)^2 \| - S_{xx}E(\hat \beta_1^2) \} \\\\ = \frac{1}{n-2} \{ \beta_1^2 S_{xx} + (n-1) \sigma^2 - S_{xx} (Var \hat \beta_1) + \| E(\hat \beta_1) \|^2) \} \\\\ = \frac{1}{n-2} \{ \beta_1 ^2 S_{xx} + (n-1)\sigma^2 - \sigma^2 -\beta_1 ^2 S_{xx} \} \\\\ = \sigma^2$
 * (The coefficient of determination $R^2 = SSR/SST = 1 -SSE/SST$):
   * Proof of SST = SSE + SSR where:
     * $SST = \sum(y_i - \bar y)^2$
     * $SSE = \sum (y_i - \hat y_i)^2$
     * $SSR = \sum (\hat y_i - \bar y)^2$
     * $SST = \sum(y_i - \bar y)^2 \\\\ = \sum (y_i - \hat y_i + \hat y_i - \bar y)^2 \\\\ = \sum [(y_i - \bar y_i)^2 + (\hat y_i - \bar y)^2 + 2(y_i - \hat y_i)(\hat y_i - \bar y)] \\\\ = \sum (y_i - \bar y_i)^2 + \sum (\hat y_i - \bar y)^2 + 2 \sum (y_i - \hat y_i)(\hat y_i - \bar y) \\\\ = SSE + SSR + 2 \sum (y_i - \hat y_i)(\hat y_i - \bar y)$
     * Therefore, we need to show the corss-product term vanishes, that is, $\sum(y_i - \hat y_i)(\hat y_i - \bar y) = 0$
     * $\sum (y_i - \hat y_i)(\hat y_i - \bar y) = \sum (y_i - \hat \beta_0 - \hat \beta_1 x_i)(\hat \beta_0 + \hat \beta_1 x_i - \hat \beta_0 - \hat \beta_1 \bar x) \\\\ = \sum (y_i - \hat \beta_0 - \hat \beta_1 x_i) \hat \beta_1 (x_i - \bar x) \\\\ = \hat \beta_1 \sum y_i (x_i - \bar x) - \hat \beta_0 \hat \beta_1 \sum(x_i - \bar x) - \hat \beta_1^2 \sum x_i(x_i - \bar x) \\\\ = \hat \beta_1 \sum(y_i - \bar y) (x_i - \bar x) - \beta_1^2 \sum(x_i - \bar x)(x_i - \bar x) \\\\ = \hat \beta_1 (S_{xy} - \beta_1 S_{xx}) = 0$
* Proof of $R^2 = \| Cor(X, Y) \|^2 = \| Cor(\hat Y, Y) \|^2$. In class, we have done $R^2 = \| Cor(X, Y) \|^2$, henc it's left to show that $\|Cor(X, Y) \|^2 = \| Cor(\hat Y, Y) \|^2$. From the definition of the coreelation coefficient,:
  * $\| Cor(\hat Y, Y) \|^2 = \frac{(\sum(\hat y_i - \bar \hat y) (y_i - \bar y))^2}{\sum(\hat y_i - \bar \hat y)^2 \sum(y_i - \bar y)^2} $
  * Note that $\bar \hat y = \hat \beta_0 \hat \beta_1 \bar x$:
    * $\| Cor (\hat Y, Y) \|^2 = \frac{(\sum )\hat y_i - \bar \hat y)(y_i - \bar y))^2}{\sum (\hat y_i - \bar \hat y)^2 \sum(y_i - \bar y)^2} \\\\ = \frac{(\sum (\hat \beta_0 + \hat \beta_1 x_i - \hat \beta_0 - \hat \beta_1 \bar x)(y_i - \bar y))^2}{\sum(\hat \beta_0 + \hat \beta_1 x_i - \hat \beta_0 - \hat \beta_1 \bar x)^2 \sum(y_i - \bar y)^2} \\\\ = \frac{(\hat \beta_1 \sum(x_i - \bar x)(y_i - \bar y))^2}{\hat \beta_1 ^2 \sum(x_i - \bar x)^2 \sum(y_i - \bar y)^2} \\\\ = \frac{(\sum(x_i - \bar x)(y_i - \bar y))^2}{\sum (x_i -  \bar x)^2 \sum(y_i - bar y)^2} \\\\ = \| Cor(X, Y) \|^2$

## Chatper 3. Multiple linear regression
 * Multiple Linear Regression Model: $Y = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \epsilon_i, i= 1, \cdots, n$
 * Matrix notation: $y = X \beta + \epsilon$

### Chatper 3.1 Parameter Estimation: Least Squares Estimation (LSE)
 * $\epsilon = y - X \beta$
 * $S(\beta) \epsilon' \epsilon = (y - X \beta)'(y - X \beta)$
 * Differentiate $S(\beta)$ in $\beta$ to find the minimum point.:
   * $\frac{\partial}{\partial \beta} S(\beta) = 2(X'X \beta - X'y) = 0$
   * \hat \beta_{LSE} = (X'X)^{-1} X'y$
 * The fitted values and residuals:
   * $\hat y_i = \hat \beta_0 + \hat \beta_1 x_{i1} + \cdots + \hat \beta_p x_{ip}$
   * $e_i = y_i - \hat y_i$
 * In matrix notation,:
   * Fitted Vector $\hat y = X \hat \beta = X(X'X)^{-1} X' y = P_X y$
   * Residual Vector $e = y - \hat y = (I - P_X)y$
 * Remark 1. The matrix $P_X = X(X'X)^{-1} X'$ is called the projection matrix onto the oclumn space of X. It is also known as the hat matrix $H = P_X$
 * Remark 2. Check $P_X^2 = P_X$, that is, it is idempotent. In addition, we can show $(I - P_X)^2 = I - P_X$ as well.


 * The unbiased estimate of the rror variance:
   * $\hat \sigma^2 = \frac{\sum_{i=1}^n e_i^2}{n-p-1} = \frac{e'e}{n-p-1} = \frac{SSE}{n-p-1}$
   * In matrix notation,
   * $\hat \sigma^2 = \frac{1}{n-p-1} e'e = \frac{1}{n-p-1} y'(I-P_X)^2 y = \frac{1}{n-p-1}y'(I-P_X)y$

### Chapter 3.2 Interpretation of the regression coefficients
 * Let $Y = \beta_0 + \beta_1 X_1 + \cdots + \beta_j X_j + \cdots + \beta_p X_p + \epsilon$ be a linear regression model to explain the data.
 * The (partial) regression coefficient $\beta_j$ is the increment in the mean response $EY$ when we increase $X_j$ by one unit while all other predictors $X_i (i \not = j)$ are held fixed.

 * The partial regression coefficient $\beta_j$ represents the contribution of $X_j$ to $Y$ after adjuesting for the other predictors
 * Let $e_{Y X_1}$ be the residual vector obtained from the linear regression model $Y = \alpha_0 + \alpha_1 X_1 + \epsilon$ and $e_{X_2 X_1}$ be the residual vector obtained from the regression model $X_2 = \gamma_0 + \gamma_1 X_1 + \epsilon$. Then, the partial regression coefficient $\beta_2$ is equal to the regression coefficient $\delta$ obtained from $e_{Y X_1} = 0 + \delta e_{X_2 X_1} + \epsilon$

### Chapter 3.3. Centering and scaling
 * The magnitudes of the regression coefficients in a regression equation depend on the unit of measurements of the variables
 * To make the regression coefficients unitless, one may first center and/or scale teh variables before performing the regression computations

 1. Unit-Length scaling:
   * $Z_y = \frac{Y - \bar y}{L_y}$
   * $Z_j = \frac{X_j - \bar x_j}{L_j}$
   * where $L_j = \sqrt{\sum_{i=1}^n (y_i - \bar y)^2}$ and $L_j = \sqrt{\sum_{i=1}^n (x_{ij} - \bar x_j)^2}$
 2. Standardizing:
   * $\hat Y = \frac{Y - \bar y}{s_y}$
   * $\hat X_j = \frac{X_j - \bar x_j}{s_j}$


### Chapter 3.4 Properties of LSEs
 * (Gauss-Markov theorem) LSE = BLUE
 * Assume $\epsilon_i \sim^{iid} N(0, \sigma^2)$, that is, $\epsilon \sim N(0, \sigma^2 I)$, and let $C = (X'X)^{-1}$:
   * A. $\hat \beta_j \sim N(\beta_j, \sigma^2 C_{jj})$
   * B. $\hat \beta \sim N(\beta, \sigma^2 C)$
   * C. $SSE/\sigma^2 \sim \chi_{n-p-1}^2$ and $\beta_j$ and $\hat \sigma^2$ are independent.


### Chapter 3.5 Multiple correlation coefficient
 * $R^2 = (cor(Y, \hat Y))^2 = \frac{(\sum(y_i - \bar y)(\hat y_i - \bar y))^2}{\sum (y_i - \bar y)^2 \sum (\hat y_i - \bar y)^2} \\\\ = \frac{SSR}{SST} = 1 - \frac{SSE}{SST} = 1 - \frac{\sum(y_i - \hat y_i)^2}{\sum (y_i - \bar y)^2}$
 * The adjuested $R^2$ is defined to be:
   * $R_{adj}^2 = 1 - \frac{SSE/(n-p-1)}{SST/(n-1)}$

### Chapter 3.6 Inference for individual regression coefficients
 * Test $H_0 : \beta_j = \beta_{j, 0} \text{ versus } H_j : \beta_j \not = \beta_{j, 0}$
 * Test statistic:
   * $t_j = frac{\hat \beta_j - \beta_{j,0}}{s.e.(\hat \beta_j)} \sim t_{n - p - 1} \text{ under H_0 }$
   * Calculate the p-value by P-value = $p(\|t_j\|) = 2 Pr(t_{n-p-1} > \| t_j \|)$ and reject $H_0$ iff the P-value <= $\alpha$

### Chatper 3.7 Tests of hypotheses in a linear model
 * Full model ($M_F$) : $y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \epsilon_{i}$ (In matrix form $Y = X \beta + \epsilon$)
 * Reduced model ($M_R$) : a model such as the above with k regression coefficients


 * $\hat y_i$ : the fitted value in the full model
 * $\hat y_i^*$ : the fitted value in the reduced model
 * $SSE(M_F) = \sum(y_i - \hat y_i)^2$ : the sum of squared redisudals in the full model
 * $SSE(M_R) = \sum(y_i - \hat y_i^*)^2$ : the sum of squared residudals in the reduced model

 * Note that $SSE(M_R) \ge SSE(M_F)$:
   * $\frac{SSE(M_R)}{\sigma^2} \sim \chi^2_{n-k}$
   * $\frac{SSE(M_F)}{\sigma^2} \sim \chi^2_{n-p-1}$
   * $\frac{SSE(M_R) - SSE(M_F)}{\sigma^2} \sim \chi^2_{p+1+k}$
 * In addition, $SSE(M_F)$ and $SSE(M_R) - SSE(M_F)$ are independent.

 * Condier a ypothesis test $H_0$ : reduced model is adequate versus $H_1$ : Full model is adequate.:
   * $F= \frac{\frac{SSE(M_R) - SSE(M_F)}{\sigma^2} / (p+ 1 - k)}{\frac{SSE(M_F)}{\sigma^2} / (n-p-1)} \\\\ = \frac{[SSE(M_R) - SSE(M_F)] / (p+1-k)}{SSE(M_F) / (n-p-1)} \sim F_{p+1 - k, n-p-1} \text{ under } H_0$
 * Suppose the reduced model has q= k -1 predictors and the coefficient of determination $R_q^2$ whereas teh full model has p predictors and the coefficient of determination $R_p^2$. Then,:
   * $R_p^2 = 1 - \frac{SSE(M_F)}{SST}$
   * $SSE(M_F) = SST[1-R_p^2]$
   * Similarly, $SSE(M_R) = SST(1 - R_q^2)$
   * Therefore, the F statistic is given by:
     * $F = \frac{(R_p^2 - R_q^2) / (p-q)}{(1 - R_p^2) / (n -p - 1)} \sim F_{p-q, n-p-1}$
   * More generally, let $M_F$ be the model including m independent parameters and $M_R$ be a submodel in the full model $M_F$ consisting of k independent parameters:
     * $F = \frac{\frac{SSE(M_R) - SSE(M_F)}{\sigma^2} / (m-k)}{\frac{SSE(M_F)}{\sigma^2}/ (n - m)} \\\\ = frac{[SSE(M_R) - SSE(M_F)] / (m-k)}{SSE(M_F) / (n-m)} \sim F_{m-k, n-m} \text{ under } H_0$

| Source     | SS  | df    | MS               | F           | P-value                      |
|------------|-----|-------|------------------|-------------|------------------------------|
| Regression | SSR | p     | MSR = SSR/p      | F = MSR/MSE | $P(F_{p+1 -k, n-p-1} \ge F)$ |
| Residudals | SSE | n-p-1 | MSE = SSE(n-p-1) |             |                              |

## Chatper 4. Diagnostics
 * As seen in the Anscombe data, particularly dataset 3 and 4, one or few observations may too much influence or completely determine the regression line. We need to check whether the fit is overly determined by few observations.
 * The confidence or prediction intervals and t-test or anova approach in hypothesis tests in Chapter 3 require normality assumption on the random errors.
 * When some of the regression assumptions are violated, the analysis based on the fit may be distorted and they are not reliable.
 * Need to check the assumptions made to apply the linear models to fit the datset.

### 4.1 Standard Regression Assumptions
 1. Assumption about the form of the model (linearity of Y and X_1, ..., X_p): $Y = \beta_0 + \beta_1 X_1 + \cdots + \beta_p X_p + \epsilon$
 2. Assumptions about the random erros: $\epsilon_1, \cdots, \epsilon_n \sim^{iid} N(0, \sigma^2)$:
   1. Normality assumption
   2. Mean zero
   3. Constant variance (homogeneity or homoscedasticity) assumption: when violated, it is called the heterogeity (or heteroscedasticity) problem
   4. Independent assumption: when violated, it is called the autocorrelation problem
 3. Assumptions about the predictors:
   1. Nonrandom
   2. No measurement erros
   3. Linearly independent: when violated, it is called the multicollinearity problem
 4. Assumption about the observations (equally reliable)

### 4.2 Residuals
 * A simple and effective method ofr detecting model deficiencies in regression analyssis is the examination of residuals
 * Projection or hat matrix : $H = P_X = X(X'X)^{-1} X'$
 * Note that $\hat y = P_X y$ and $e = (I - P_X) y$
 * Let $p_{ij}$ be the (i, j) element of the projection matrix. For a simple linear regression,:
   * $p_{ij} = \frac{1}{n} + \frac{(x_i - \bar x)(x_j - \bar x)}{\sum (x_i - \bar x)^2}$
 * The diagonal term $h_i = p_{ii}$ is called the leverage value of the i th observation. $p_{ii}$ is denoted by $h_i$ in other literatures. For a simple linear regression,:
   * $h_i = p_{ii} = \frac{1}{n} + \frac{(x_i - \bar x)^2}{\sum (x_i - \bar x)^2}$
 * Since $\hat y_i = p_{i1}y_1 + \cdots + p_{ii}y_i + \cdots + p_{in} y_n$, the leverage $p_{ii}$ is the weight (leverage) given to $y_i$ in determining the i th fitted value $\hat y_i$
 * $Var(e_i) = \sigma^2 (1 - p_{ii})$
 * $\hat \sigma^2 = \frac{1}{n - p - 1} \sum_{i=1}^n e_i^2 = \frac{1}{n-p-1} SSE$
 * $\hat \sigma^2_{(i)}  = \frac{1}{n - p - 2} SSE_{(i)}$ where $SSE_{(i)}$ is the sum of squares of residuals when n - 1 observations are used to fit by deleting the i th observation.

 * Various types of residuals:
   1. Standardized residual:
     * $z_i = \frac{e_i}{\sigma\sqrt{1 - p_{ii}}}$
     * $E(z_i) = 0$ and $V(z_i) = 1$, but $\sum z_i \not = 0$
   2. Internally studentized residual:
     * $r_i = \frac{e_i}{\hat \sigma \sqrt{1 - p_{ii}}}$
   3. Externally studentized reisudal:
     * $r_i^* = \frac{e_i}{\hat \sigma_{(i)} \sqrt{1 - p_{ii}}} \sim t_{n-p-2}$
     * For simplicity, we refer to the studentized residuals as the standardized residuals. Note:
       * $r_i^* = r_i \sqrt{\frac{n-p-2}{n-p-1 - r_i^2}}$
       * so that $r_i$ and $r_i^*$ are close to each other when the sample size n is large

 * Remark 3. For the purpose of residual plots, it makes little difference as to which of the two forms of the standardized residuals is used. From here on, we shall use the internally standardized residuals in the graphs. We need not make any distinction between the internally and externally standardized residuals in our residual plots. Several graphs of the residuals are used for checking the regression assumptions.


### 4.3 Graphical Methods
 1. Detect errors in the data (e.g., an outlying point may be a result of a typographical error)
 2. Recognize patterns in the data (e.g., clusters, outliers, gaps, etc.)
 3. Explore relationships among variables
 4. Discover new phenomena
 5. Confirm or negate assumptions
 6. Assess the adequacy of a fitted model
 7. Suggest remedial actions (e.g., transform the data, redesign the experiment, collect more data, etc.)
 8. Enhace numerical analyses in general

 * Graphs before fitting a model. These are useful, for exmpale, in correcting erros in data and in selecting a model
 * Graphs after fitting a model. These are particularly useful for checking the assumptions and fore assessing the goodness of the fit.

 1. Q-Q plot or P-P plot or normal probability plot: checking normality
 2. Scatter plots of the standardized residual vs X_i : checking linearity and homogeneity
 3. Scatter plot of standardized residual vs fitted values: checking linearity and homogeneity
 4. Index plot of the standardized residuals: checking independent errors


### 4.4 Leverages, Outliers Influence
 * We do not want our fit to be determined by one or few observations

#### 4.4.1 Outliers in response
 * Observation with large standardized residuals are outliers in the resposne variable
 * See Anscombe's quartet (c). But the outlier in (d) can not be detected by the residuals
 * In R, use `outlierTest`

#### 4.4.2 Outliers in predictors
 * $h_i = H_{ii} = P_{ii}$ are called levwerages and depend only on the predictors
 * From $Var(e_i) = \sigma^2(1 - h_i)$, a large leverage $h_i$ will make $Var(e_i)$ small (<=> The fit will be forced to be close to $y_i$)
 * In addition, a large leverage point may not be detected in the residual plot since $e_i$ is small
 * High leverage points : $h_i \ge 2(p+1)/n$
 * See Anscombe's quartet (d). The leverage of 8 th observation is 1 and its residual is 0
 * In R, `X=model.matrix(fit); hat(X)`

#### 4.4.3 Masking and Swamping Problems
 * Masking occurs when the data contain outliers but we fail to detect them. THis can happen because some of the outliers may be hidden by other outliers in the data.
 * Swamping occurs when we wrongly declare some of the nonoutlying points as outliers. This can occur because outliers tend to pull the regression equation toward them, thence make other points lie far from the fitted equation
 * Masking is a false negative decision whereas swamping is a false positive.

#### 4.4.4 Incluential points
 * If deletion of an observation make substantial change in the fit (estimated coefficients, fitted values, t-Tests, etc), then it is called an influential point
 * See Anscombe's quartet (c) and (d)
 * Meausres of influence:
   * Cook's distance: $C_i = \frac{(\hat \beta - \hat \beta_{(i)})' (X'X) (\hat \beta - \hat \beta_{(i)})}{\hat sigma^2 (p+1)} = \frac{\sum_{j=1}^n (\hat y_j - \hat y_{j(i)})^2}{\hat \sigma^2 (p+1)} = \frac{r_i^2}{p+1} \frac{p_{ii}}{1 - p_{ii}}$:
     * Rule of thumbs : $C_i \ge 1$
   * Welsch and Kuh's measure: $DFFITS_i = \frac{\hat y_i - \hat y_i(i)}{\hat \sigma_{(i)} \sqrt{p_{ii}}} = r_i^* \sqrt{p_{ii}}{1 - p_{ii}}$:
     * Rule of thumbs : $\|DFFITS_i\| \ge 2 \sqrt{(p+1) / (n-p-1)}$
   * Hadi's influence meausre: $H_i = \frac{p_{ii}}{1-p_{ii}} + \frac{p+1}{1-p_{ii}} \frac{d_i^2}{1 - d_i^2} \text{ where } d_i = e_i / \sqrt{SSE}$

 * What do we do with the outliers and influential points? Do not automatically remove the observations!:
   1. Check for a data entry error first
   2. Examine the physical context - why did it happen?
   3. Exclude the point from the analysis but try reincluding it later if the model is changed
   4. Redesign the experiment or sample survey, collect more data


### 4.5 Added-variable (AV) plot and residual plus component (RPC) plot
 * What are the effects of deleting or adding one of variables from or to the model? The t-test is valid only if the underlying assumptions hold
 * There are two popular graphical ways to complement the t-test
 * Scatter plot matrix shows marginal relationship of each predictor and the response variable, that is, simple linear regression models

 * Added-variable plot (partial regression plot, adjuested variable plots, and individual coefficient plots):
   * Let $e(Y \| X_{(i)})$ be the residuals of the regression of $Y$ on $X_1, ..., X_{j-1}, X_{j+1}, ..., X_p$, that is , the residuals of:
     * $Y = \beta_0 + \beta_1 X_1 + \cdots + \beta_{j-1} X_{j-1} + \beta_{j+1} X_{j+1} + \cdots + \beta_p X_p + \epsilon$
   * Let $e(X_j \| X_{(j)})$ be the residuals of the regression of $X_j$ on $X_1, ..., X_{j-1}, X_{j+1}, ..., X_p$, that is, the residuals of:
     * $X_j = \alpha_0 + \alpha_1 X_1 + \cdots + \alpha_{j-1} X_{j-1} + \alpha_{j+1} X_{j+1} + \cdots + \alpha_p X_p + \epsilon$
   * The scatter plot $(e(X_j \| X_{(j)}), e(Y \| X_{(j)}))$ is called the added-variable plot.:
     * $e(Y \| X_{(j)}) = (I - H_{(j)}) y$
     * $e(X_j \| X_{(j)}) = (I - H_{(j)}) x_j$
     * $(I - H_{(j)}) y = (I - H_{(j)}) x_j \beta_j + \epsilon '$'
   * Hence, the slope of the added-variable plot is the same as the jth regression coefficient in the full model.
   * The AV plot can detect nonlinearity between the response and the predictors
   * The AV plot is also useful to detect outliers or influential points

 * Residual plus component plot (parital residual plot):
   * A multiple linear regression model can be written as:
     * $Y - \beta_0 - \beta_1 X_1 - \cdots - \beta_{j-1}X_{j-1} - \beta_{j+1} X{j + 1} - \cdots - \beta_p X_p = \beta_j X_j + \epsilon$
     * The response adjusting the effects of other predictors is equal to $\beta_j X_j + \epsilon$ and the estimated quantity is equal to $\hat \beta_j X_j + e$
   * The residual plus component plot is $(X_j, e + \hat \beta_jX_j)$, where the residuals $e_i$' and the regression coefficients $\hat \beta_j$'s are obtained from the full model.
   * The residual plus component plot tends to detect nonlinearity between $X_j$ and $Y$ better than the added-variable plot

#### 4.5.1 Effects of adding a variable
 * There are four possible cases when adding a predictor in a model.:
   * The new variable has an insignificant regression coefficient and the remaining regression coefficients do not change substantially from their previous values. Under these conditions the new variable should not be included in the regression equation, unless omse other external conditions (e.g., theory or subject matter considerations) dictate its inclusion.
   * The new variable has a significant regression coefficient, and the regression coefficients for the previously introduced variables are chagned in a substantial way. In this case the new variable should be retained, but an examination of collinearity should be carried out. If there is no evidence of collinearity, the variable should be included in the equation and other additional variables should be examined for possible inclusion. On the other hand, if the variables show collinearity, corrective actions should be taken.
   * The new variable has a significant regression coefficient, and the coefficients of the previously introduced variables do not change in any substantial way. This is the ideal situation and aries when the new variable in uncorrelated with the previously introduced variables. Under these conditions the new variable should be retained in the equation.
   * The new variable has an insignificant regression coefficient, but the regression coefficients of the previously introduced variables are substantially changed as a result of the introduction of the new variable. This is clear evidence of collinearity, and corrective actions have to be taken before the equation of the inclusion or exclusion of the new variable in the regression equation can be resolved.

#### 4.5.2 Robust regression
 * Another approach, useful for the identification of outliers and influential observations, is robust regression, a method of fitting that gives less weight to points with high leverage.

## Chapter 5. Regression analysis with qualitative explanatory variables
### 5.1 Introduction
 * Predictor(s) may be qualitative: Use dummy (indicator) variables
 * Dummy variable takes only on 0 or 1.
 * For a qualitative variable with k possible categories $(C_1, \cdots, C_k)$, we need k-1 dummy variables: $I(C_1), \cdots, I(C_{k-1})$ since $I(C_1) + \cdots + I(C_k) = 1$

### 5.2 Interactions
 * Interaction effects example

### 5.3 Equal slopes and unequal intercepts
 * Let D be a dummy variable.:
   * $EY = \beta_0 + \beta_1 X + \beta_2 D$
   * is a model equivalent to:
     * $EY = \beta_0 + \beta_1 X \text{ for } D = 0$
     * $EY = (\beta_0 + \beta_2) + \beta_1 \text{ for } D = 1$

### 5.4 Unequal slopes and unequal intercepts
 * There may exist an interaction effect between a qualitative predictor and a quantitative predictor to the response variable
 * Let D be a dummy variable. The interaction effect of D (qualitative predictor) and X (quantitative predictor) to the response variable Y produces the model with unequal slopes of X (quantitative predictor) and uneuqla intercepts:
   * $EY = \beta_0 + \beta_1 X + \beta_2 D + \beta_3 (X: D)$
   * is a model equivalent to:
     * $EY = \beta_0 + \beta_1 X \text{ for } D = 0$
     * $EY = (\beta_0 + \beta_2) + (\beta_1 + \beta_3) X \text{ for } D = 1$

### 5.5 Seasonality

## Chapter 6. Transformations
 * Use transformations to achieve linearity or/and homogeneity
### 6.1 Transformations for lienarity
 * Non-linearity between predictor(s) and response may be detected by a scatter plot (simple linear regression) or an added-variable plot or residual plus component plot (multiple linear regression)

| Function                                                    | Transformation                       | Linear Form                 |
|-------------------------------------------------------------|--------------------------------------|-----------------------------|
| $Y=\alpha X^{\beta}$                                        | $Y' = logY, X' = logX$               | $Y'=\alpha ' + \beta X'$    |
| $Y = \alpha e^{\beta X}$                                    | $Y' = logY$                          | $Y' = log \alpha + \beta X$ |
| $Y = \alpha + \beta log X$                                  | $X' = logX$                          | $Y = \alpha + \beta X'$     |
| $Y = \frac{X}{\alpha X - \beta}$                            | $Y' = \frac{1}{Y}, X' = \frac{1}{X}$ | $Y' = \alpha - \beta X'$    |
| $Y = \frac{e^{\alpha + \beta X}}{1 + e^{\alpha + \beta X}}$ | $Y' = log \frac{Y}{1-Y}$             | $ Y' = \alpha + \beta X$    |

### 6.2 Detection of heterogeneity
 * Heterogeneity may be detected by the residual plots (residuals vs each predictors or residuals vs fitted values). A formal test can be performed by ncvTest (car) or bptest (lmtest)


### 6.3 Variance stabilizing transformations
 * Note that the variance stabilizing transform makes the rror distribution closer to a normal distribution as well

| $\sigma$                            | Transformation     |
|-------------------------------------|--------------------|
| $\sigma = \mu^k$                    | $Y^{1 - k}$        |
| $\sigma = \mu$                      | $log Y$            |
| $\sigma = \sqrt{\mu}$               | $\sqrt{Y}$         |
| $\sigma = \sqrt{\mu (1 - \mu) / n}$ | $arcsin(\sqrt{Y})$ |

### 6.4 Weighted Least Squares (WLS)
### 6.5 Box-Cox power transformations
 * $f(Y;\lambda) = \begin{cases} \frac{Y^{\lambda} - 1}{\lambda} & \text{ for } \lambda \not = 0 \\\\ log Y & \text{ for } \lambda = 0 \end{cases}$
 * is called the Box-Cox power transformation where $\lambda$ may be estimated from the data. Historically, the main purpose of the Box-Cox transform was to make a random variable closer to a normal distribution

## Chatper 7. Weighted Least Squares
 * Model: $y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \epsilon_i$. In a matrix form, $Y = X \beta + \epsilon$
 * Suppose that $Var(\epsilon) = \sigma_i^2$
 * Then the transformed new model $\frac{y_i}{\sigma_i} = \beta_0 \frac{1}{\beta_i} + \beta_1 \frac{x_{i1}}{\sigma_i} + \cdots + \beta_p \frac{x_{ip}}{\sigma_i} + \frac{\epsilon_i}{\sigma_i}$ would have a constant variance erros.
 * Let $w_i = \frac{1}{\sigma_i^2}$ be the weight on Observation i. Let $W = diag(w_1, \cdots, w_n)$
 * Minimize:
   * $ SSE^*(\beta) = \sum w_i(y_i - \beta_0 - \beta_1 x_{i1} - \cdots - \beta_p x_{ip})^2 \\\\ = \sum (\frac{y_i}{\sigma_i} - \beta_0 \frac{1}{\sigma_i} - \beta_1 \frac{x_{i1}}{\sigma_i} - \cdots - \beta_p \frac{x_{ip}}{\sigma_i})^2 \\\\ = \sum (y_i ^ * - \beta_0 x_{i0} ^ * - \beta_1 x_{i1} ^ * - \cdots - \beta_p x_{ip} ^ *)^2 $
   * by defining new variables $y_i^* = y_i / \sigma_i$ and $x_{ij}^* = x_{ij} / \sigma_i$

 * In matrix form,:
   * $\epsilon = Y - X \beta$
   * $SSE^*(\beta) = \epsilon ' W \epsilon = (Y - X\beta)' W (Y - X \beta)$
   * We define $Y^* = W^{1/2} Y$ and $X^* = W^{1/2} X$, where $W^{1/2} = diag(1/\sigma_1, \cdots, 1/\sigma_n)$

 * The LSEs with the transformed data are given by:
   * $\hat \beta^* = ((X ^ *)' X ^ *)^{-1} (X^*)' Y ^ * \\\\ = (X'WX)^{-1} X'WY$
   * that are teh WLS estimates of the regression coefficient vector $\beta$ with the untransformed data

 * Statistics in terms of the transformed data and the untransformed data:
   * Let $y_i ^ *$ be the ith transformed response value: $y_i ^ * = \sqrt{w_i} y_i$, that is, $Y ^ * = W^{1/2} Y$
   * Let $x_{i0} ^ *, \cdots, x_{ip} ^ *$ be the ith transformed predictor values : $x_{i0} ^ * = \sqrt {w_i} x_{i0}, \cdots, x_{ip} ^ * = \sqrt{w_i} x_{ip} ^ *$, that is, $X^* = W^{1/2} X$
   * The WLS method minimizes $\sum_{i=1}^n w_i (y_i - \beta_0, x_{i0} - \cdots - \beta_p x_{ip})^2 = \sum_{i = 1}^n(y_i ^ * - \beta_0 x_0 ^ * - \cdots - \beta_p x_{ip} ^ *)^2$:
     * Let $\hat \beta_i ^ *$ be teh WLS estimate of $\beta_i$ and the residual sum of squares of the transformed data can be written as:
       * $SSE ^ * = \sum_{i=1}^n w_i (y_i - \hat \beta_0 ^ * x_{i0} - \cdots - \hat \beta_p ^ * x_{ip})^2 = \sum_{i=1}^n (y_i ^ * - \hat \beta_0 ^ * x_{i0} ^ * - \cdots - \hat \beta_p ^ * x_{ip} ^ *)^2 \\\\ = (Y - X \hat \beta ^ *)' W (Y - X \hat \beta ^ *) = (Y ^ * - X ^ * \hat \beta ^ *) ' (Y ^ * - X ^ * \hat \beta ^ *)$
       * $SST ^ * = \sum_{i=1}^n w_i (y_i - \bar y)^2 = \sum_{i=1}^n (y_i ^ * - \bar y ^ *)^2 \\\\ = (Y - \bar Y)' W (Y - \bar Y0) = (Y ^ * - \bar Y ^ *)' (Y ^ * - \bar Y ^ *)$
       * $\hat \sigma ^ * = \sqrt{ \frac{ SSE ^ * }{n - p - 1}}$ => R shows this value
       * $R^2 = 1 - \frac{SSE ^ * }{SST ^ *}$ => R shows this value
     * Using the WLS estimates $\hat \beta_i ^ *$ and the untransformed data $y_i, x_{i0}, \cdots, x_{ip}$:
       * $SSE(\hat \beta ^ *) = \sum_{i=1}^n(y_i - \hat \beta_0 ^ * x_{i0} - \cdots - \hat \beta_p ^ * x_{ip}) ^2 \\\\ = (Y - X \hat \beta ^ *) ' (Y - X \hat \beta ^ *)$
       * $SST = \sum_{i=1}^n (y_i - \bar y)^2 \\\\ = (Y - \bar Y) ' (Y - \bar Y)$
       * $\hat \sigma = \sqrt{\frac{SSE(\hat \beta ^ *)}{n-p-1}}$
       * $Pseudo-R^2 = 1 - \frac{SSE(\hat \beta ^ *)}{SST}$
   * Since the LSEs $\hat \beta_{LS}$ minimize SSE and the WLS estimates $\hat \beta ^ *$ do not minimize SSE, it is always true that $SSE(\hat \beta ^ *) \ge SSE(\hat \beta_{LS})$. The pseudo $R^2$ is always smaller than $R^2$ calculated usign the LSE $\hat \beta_{LS}$


 * How to know or find the weight $w_i$?:
   * If known a priori, then use it.
   * If unknown, then first fit the data using the OLS method and then figure out the weights $w_i$. At the second stage, fit the data using WLS with the esitmated weightts (Two-stage procedure)

 * Adding the qualitative variable Region to the model may cure the heterogeneity problem
 * We may try a variance stabilizing transform as well through Box-Cox transform.


## Chapter 8. Correlated errors
 * One of the standard regression assumptions: $\epsilon_i$ and $\epsilon_j$ for $i \not = j$ are independent.
 * WHen the observations have a natural sequential order as in time series data or spatial data, the coreelation is referred to as autocorrelation (serial correlation, lagged correlation), that is the correlation between the current value and the past value for an example in time series data
 * Why does the auto correlation occur?:
   1. Successive observations that are positively correlated: adjacent random errors and residuals tend to be similar in both temporal and spatial dimensions due to similar external conditions
   2. Omitted an important predictor of which adjacent values are correlated.
 * Effects or consequences of ignoring the autocorrelation: What happens if we ignore the autocorrelation when it exists?:
   1. LSEs are still unbiased but not minimum variance, ie.e., lose efficiency
   2. $\hat \sigma^2$ may be an underestimate of $\sigma^2$, that is, $E(\hat \sigma^2) < \sigma^2$
   3. CIs and hypothesis tests may be invalid

### 8.1 Runs Test
 * Definition 8.8.1 (Runs test):
   * Suppose that we have $n_1$ "+"s and $n_2$ "-"s. Under assumption of randomness of "+" and "-", every sequence would have the same probabilty with $\frac{1}{\binom{n_1 + n_2}{n_1}}$. A run is defined as the number of groups in the sequence.
   * For instance, ++---++ has three runs and +-+-++- has 6 runs. To test randomness of a sequence, we can calculate the p-value from all the permutations of the sequence of which the probability is equal.
 * When $n_1$ = #+'s and $n_2$ = #-'s are large (>= 10), the expected value and the variance of the runs under the null hypothesis of randomness are:
   * $\mu = \frac{2 n_1 n_2}{n_1 + n_2} + 1$
   * $\sigma^2 = \frac{2 n_1 n_22 (2 n_1 n_2 - n_1 - n_2)}{(n_1 + n_2)^2 (n_1 + n_2 - 1)}$
 * The large sample test statistic of randomness is:
   * $ZZ = \frac{runs - \mu}{\sigma} \sim N(0, 1) \text{ under } H_0$

### 8.2 Durbin-Watson test
 * First order autocorrelation model:
   * $\epsilon_t = p \epsilon_{t - 1} + w_t \text{ where } \| \rho \| < 1, w_t \sim^{iid} N(0, \sigma^2)$
   * where $\rho$ is the correlation coefficient between $\epsilon_t$ and $\epsilon_{t-1}$
 * Test $H_0: \rho = 0 \text{ against } H_1 : \rho > 0$
 * Test statistic is:
   * $d = \frac{\sum_{t=2}^n(e_t - e_{t-1})^2}{\sum_{t=1}^n e_t^2}$
 * The estimate of $\rho$ is:
   * $\hat \rho = \frac{\sum_{t=2}^n e_t e_{t-1}}{\sum_{t=1}^n e_t^2}$
 * The Durbin-Watson statistic is approximately:
   * $d = 2(1 - \hat \rho)$

### 8.3 Transformation to remove autocorrelation (Cochrane and Orcutt, 1949)
 * Cochrane and Orcutt's iterative procedure:
   1. Estimate $\beta_0$ and $\beta_1$ of $y_t = \beta_0 + \beta_1 x_t + \epsilon_t$ using OLS method.
   2. Obtain the residuals $e_t$ and estimate $\hat \rho = \frac{\sum_{2}^n e_t e_{t-1}}{\sum_{1}^n e_t^2}$
   3. Calculate $y_t ^ * = y_t - \rho y_{t-1}$ and $x_t ^ * = x_t - \rho x_{t-1}$ and estimate $\beta_0 ^ *$ and $\beta_1 ^ *$. Obtain $\hat \beta_0 = \frac{\hat \beta_0 ^ *}{1 - \hat \rho}$ and $\hat \beta_1 = \hat \beta_1 ^ *$
   4. Examine the autocorrelation by using the residuals obtained from 3: $\e_t = y_t - \hat \beta_0 - \hat \beta_1 x_t$
   5. Repeat 2-4 until we remove the autocorrelation
 * Note that Cochrane-Orcutt's procedure does not guarantee convergence


 * Another approach, the textbook called it iterative method, is to minimize:
   * $S(\rho, \beta_0, \beta_1) = \sum_{i = 2}^n(y_t - \rho y_{t-1} - \beta_0 (1- \rho) - \beta_1 (x_t - \rho x_{t-1}))^2$
   * The results by this methoid usually do not significantly deviate from those by Cochrane-Orcutt procedure

### 8.4 Autocorrelation and missing predictors
 * Autocorrelation may appear when a model is missing a significant predictor

### 8.5 Seasonality and dummy variables
 * Durbin-Watson test and runs test may not detect a certian type of correlations. One of which is seasonality

## Chatper 9 Multicollinearity
 * One of the standard regression assumptions is that the predictors are linearly independent
 * We call orthogonal predictors if there is completely no linear relationship between the predictors, that is, the predictors are uncorrelated.
 * Interpretation does not work any longer if there is multicollinearily ($\beta_j$: The increment of the response by increasing one unit of $X_j$ when all other variables are held fixed??)
 * Multicollinearity produces unstable estimates of the regression parameters, that is, the standard error of the regression parameter betcomes large.

### 9.1
#### 9.1.1 Multicollinearity may affect inferences in a regression model
#### 9.1.2 Multicollinearity may affect forecasting

 * Prediction may work with careful consideration of the predictors, that is , the values of the predictors are chosen by satisfying the correlation structures of  the predictors, but the prediction under change of a single predictor whil holding others fixed may not be reasonable.

### 9.2 Detection of multicollinearity
 * Definition 9.2.1 (Variance INflaction Factor (VIF)):
   * Let $R_j^2$ be the coefficient of determination whe n$X_j$ is regressed on all other predictors. The variance inflation factor (VIF) for $X_j$ is defined by:
     * $VIF_j = \frac{1}{1 - R_j^2}$
 * Note that $ 1 \le VIF_j < \infty$. When all predictors are orthogonal, $VIF_j = 1$. If $VIF_j > 10$, then the estimate of $\beta_j$ may be unstable. The variance of the LS estimate of $\beta_j$ is proportional to $VIF_j$ when $X_j$ is centered and scaled.
 * Note $R_j^2 = 1 - \frac{1}{VIF_j}$. Therefore, $VIF_j > 10$ is equivalent to $R_j^2 > 0.9$
 * The average $VIF_j$ values, denoted by $\bar VIF$, is the ratio of the squared error of the LSEs to the squared errors the estimates when the predictors are orthogonal
 * $Cov(\hat \beta) = \sigma^2 (X' X)^{-1}$. The kth diagonal term of $(X'X)^{-1}$ is:
   * $((X'X)^{-1})_{kk} = [x'_k x_k - x'_k X_{(k)} (X'_{(k)} X_{(k)}) ^{-1} X'_{(k)} x_k]^{-1} \\\\ = [x'_k ( I - P_{X_{(k)}})]^{-1} \\\\ = [S_{kk}(1 - R_k^2)]^{-1} \\\\ = \frac{VIF_k}{S_{kk}} \\\\ = \frac{VIF_k}{(n-1)Var(x_k)}$

 * Definition 9.2.2 (The condition indices and the condition number).:
   * $Let \lambda_1 \ge \cdots \ge \lambda_p$ be the ordered eigenvalues of the correlation matrix of the predictors. THe jth condition index is defined by:
     * $\kappa_j = \sqrt{\frac{\lambda_1}{\lambda_j}}$
   * When it is large, there exists multicollinearity. The largest value $\kappa_p$ is called the condition number of the correlation matrix and there may be a strong multicollinearity if $\kappa_p \ge 15$

### Summary of Chapter 9
 * Consequences of multicollinearity:
   * Interpretation of the fitted model may not be reaonsable
   * Predcition may not work without careful handling of collinearity
   * The variance(s) of the LSE(s) may be large.
 * How to detect multicollinearity?:
   * Look at the scatter plot matrix
   * Calculate VIFs and see if any VIF > 10.
   * Calculate the condition indicies $\kappa_j = \sqrt{\lambda_1 / \lambda_j}$ and see if any condition index > 15


## Chatper 10. Methods for data with multicollinearity
 * We may delete some variables causing multicollinearity. => It may not be clear which variable(s) should be removed.
 * Principal components regression followed by deleting some components with small variances
 * Ridge regression and LASSO

### 10.1 Principal components
 * Have X centered and scaled so that we assume $Var(X_j) = 1$ and $E(X_j) = 0$
 * Transform $X_1, \cdots, X_p$ to p orthogonal predictors, $C_1, \cdots, C_p$:
   * $C_j = v_{1j} X_1 + v_{2j} X_2 + \cdots + v_{pj} X_p$
   * Let $V = (v_1; \cdots; v2) = \begin{pmatrix} v_{11}&v_{12}& \cdots& v_{1p} \\\\ v_{21}& v_{22} &\cdots& v_{2p} \\\\ \vdots &\vdots& \ddots& \vdots \\\\ v_{p1}& v_{p2}& \cdots& v_{pp} \end{pmatrix}$
   * be the matrix whos column vectors are orthonormal eigenvectors of $\frac{1}{n-1} X' X$, that is , $(\frac{1}{n-1} X' X) v_i = \lambda_i v_i$ and $v_j ' v_i = \delta_{ij}$
   * New data set may be written as:
     * $C_{n \times p} = X_{n \times p} V_{p times p}$
     * $\frac{1}{n-1} C'C=V'(\frac{1}{n-1} X'X) V \\\\ = \Lambda = diag(\lambda_1, \cdots, \lambda_p)$
     * that is, $C_j$ has the sample variance $\lambda_j$ and $C_i$ and $C_j$ for $i \not = j$ have zreo sample correlation coefficient.
 * If some eigenvalues are quite smaller than others or near zero, then multicollinearity exists. The principal components (PCs) with samll eigenvalues may give use the relationship between the predictors


 * Summary of principal components:
   * Diagonalize the covariance or correlation matrix
   * Eigenvector => Coefficients of the principal component
   * Eigenvalue => Variance of the principal component

### 10.2 Recovering the regression coefficients of the original variables
#### 10.2.1 Recovering LSEs from the fit using the centered or/and scaled data
 * Let $Y= \beta_0 + \beta_1 X_1 + \cdots + \beta_p X_p + \epsilon '$, that is $Y = \beta_0 1 + X \beta + \epsilon'$.
 * Assume that $W$ and $Z = (Z_1, \cdots, Z_p)$ are centered and scaled variables of $Y$ and $X = (X_1, \cdots, X_p)$, respectively.
 * Note that the LSE of the intercept for the centered variables iz zero since:
   * $W = \theta_0 1 + Z \theta + \epsilon$
   * $\begin{pmatrix} \hat \theta_0 \\\\ \hat \theta \end{pmatrix} = [\begin{pmatrix} 1' \\\\ Z' \end{pmatrix} \begin{pmatrix} 1 : Z \end{pmatrix}]^{-1} \begin{pmatrix} 1' \\\\ Z' \end{pmatrix} W \\\\ = \begin{pmatrix} n &0 \\\\ 0 &Z'Z\end{pmatrix} ^{-1} \begin{pmatrix} 0 \\\\ Z'W \end{pmatrix} \\\\ = \begin{pmatrix} \frac{1}{n} &0 \\\\ 0& [Z'Z]^{-1} \end{pmatrix} \begin{pmatrix} 0 \\\\ Z'W \end{pmatrix} \\\\ = \begin{pmatrix} 0 \\\\ (Z'Z)^{-1}Z'W \end{pmatrix}$
 * Hence we do not need $\theta_0$ for the centered data:
   * $W=Z\theta + \epsilon$
   * $\frac{Y - \bar y 1}{s_y} = \theta_1 \frac{X_1 - \bar x_1 1}{s_{x_1}} + \cdots + \theta_p \frac{X_1 - \bar x_p 1} {s_{x_p}} + \epsilon$
   * $Y = (\bar y - \theta_1 \frac{s_y}{s_{x_1}} \bar x_1 - \cdots - \theta_p \frac{s_y}{s_{x_p}} \bar x_p) 1 + \theta_1 \frac{s_y}{s_{x_1}} X_1 + \cdots + \theta_p \frac{s_y}{s_{x_p}} X_p + s_y \epsilon$
 * Compare the above to:
   * $Y = \beta_0 + \beta_1 X_1 + \cdots + \beta_p X_p + \epsilon'$
 * We conclude that:
   * $ \beta_i = \theta_i \frac{s_y}{s_{x_i}} \text{ for } i = 1, \cdots, p$
   * $ \beta_0 = \bar y - \beta_1 \bar x_1, - \cdots - \beta_p \bar x_p$

#### 10.2.2 Recovering the LSEs from the fit using the principal components
 * Let $(Z'Z)V = (n-1)V \Lambda$, that is, $V'(Z'Z)V = (n-1)\Lambda = (n-1)diag(\lambda_1, \cdots, \lambda_p)$ where $\lambda_1 \ge \cdots \ge \lambda_p$ and $VV' = V'V =I$
 * Define $C=ZV$ The jth vector $C_j = Z_1 v_{1j} + \cdots + Z_p v_{pj}$ that is called the jth principal component.
   * $W = Z\theta \epsilon$
   * $W = (ZV)(V' \theta) + \epsilon$
   * $W = C \alpha + \epsilon$
 * The LSE of $\alpha$ is:
   * $\hat \alpha = (C'C)^{-1} C' W \\\\ = \frac{1}{n-1} \Lambda^{-1} C' W$
   * $Cov(\hat \alpha) = \frac{1}{(n-1)^2} \Lambda ^{-1} C' Cov(W) C \Lambda^{-1} \\\\ = \frac{1}{(n-1)^2} \Lambda^{-1} C' \frac{\sigma^2}{s_y^2} IC\Lambda ^{-1} \\\ = \frac{\sigma^2}{(n-1)s_y^2} \Lambda ^{-1}$
   * that means the variance of $\hat \alpha_i = \frac{\sigma^2}{(n-1)s_y^2} \lambda_i$ and $\hat \alpha_i$ and $\hat \alpha_j$ are note correlated for $i \not = j$. This implies that is $\lambda_i$ is small, then the LSE of $\alpha_i$ has high uncertainty. Since $V' \theta = \alpha$,:
   * $\hat \theta = V \hat \alpha$
   * $Cov(\hat \theta) = \frac{\sigma^2}{(n-1) s_y^2} V \Lambda^{-1} V'$

#### Summary of recovering regression coefficients
 * Let $\hat \alpha$ be the regression coefficients vector from the principal components.
 * Let $\hat \theta$ be the regression coefficients vector from centered and/or scaled data
 * Let $\hat \beta$ be the regression coefficients vector from the original data
 * $\hat \theta = V \hat \alpha, \text{ that is }, \hat \theta_i = \sum_{j=1}^p v_{ij} \hat \alpha_j$
 * $\hat \beta_i = \hat \theta_i \frac{s_y}{s_{x_i}} \text{ for } i = 1, \cdots, p$
 * $\hat \beta_0 = \bar - \hat \beta_1 \bar x_1 - \cdots - \hat \beta_p \bar x_p$

 * Standard errors of the estimates: The variance of the regression coefficients can be written as:
   * $Cov(\hat \alpha) = \frac{\sigma^2}{(n-1) s_y^2} \Lambda^{-1} = \frac{\sigma^2}{(n-1) s_y^2} diag(\frac{1}{\lambda_1}, \cdots, \frac{1}{\lambda_p})$
   * $Cov(\hat \theta) = V Cov(\hat \alpha) V' = \frac{\sigma^2}{(n-1) s_y^2} V \Lambda^{-1} V'$
   * $Var(\hat \theta_i) = \frac{\sigma^2}{(n-1) s_y^2} \sum_{j=1}^p \frac{v_{ij}^2}{\lambda_j}$
   * $\hat {Var} (\hat \beta_i) = \frac{\hat \sigma^2}{(n-1) s_{x_i}^2} \sum_{j=1}^p \frac{v_{ij}^2}{\lambda_j}$
   * $s.e.(\hat \beta_i) = \frac{\hat \sigma}{\sqrt{n-1} s_{x_i}} \sqrt{\sum_{j=1}^p \frac{v_{ij}^2}{\lambda_j}}$


### 10.3 Principal component regression (Dimension reduction)
 1. Center and/or scale the data
 2. Calculate the principal components of the sample variance-covariance matrix or the sample correlation matrix
 3. Select the number of principal components
 4. Fit the data using the selected principal components
 5. Recover the estimates of the regression coefficients

 * Note that the number of principal components may be selected by the cross-validation (CV) method


### 10.4 Ridge regression
 * Suppose that the data set is centered and scaled.
 * The LSE of the regression coefficients in matrix form can be written as:
   * $\hat \theta = (X' X)^{-1} X' y$
 * Multicollinearity makes $X'X$ (almost) singular => LSEs are unstable
 * Hoerl and Kennard (1970) proposed the ridge regression:
   * $\hat \theta ^ *(\lambda) = (X'X + \lambda I) ^{-1} X'y$
 * The ridge estimator $\hat \theta^*(\lambda)$ is to minimize:
   * $(y - X \theta)'(y - X \theta) + \lambda \sum_{j=1}^p \theta_j ^2$
   * Equaivalently, minimize:
     * $(y - X \theta)' (y - X \theta) \text{ given } \sum_{j=1}^p \theta_j^2 \le C$
   * $\lambda$ = tuning parameter to be selected.
   * $\lambda = 0$ => OLS
   * $\lambda = \infty$ => All estimates = 0
 * How to select the tuning parameter $\lambda$?:
   * HKB method : Hoerl, Kennard, and Baldwin (1975):
     * $\lambda = \frac{p \hat \sigma^2 (0)}{\sum_{j=1}^p \hat \theta_j (0)}$
   * Iterative method: Let $\lambda_0$ be the estimate of HKB:
     * $\lambda_i = \frac{p \hat \sigma^2(0)}{\sum_{j=1}^p \hat \theta_j (\lambda_{i-1})}$
   * Ridge trace: Use the plot of the ridge estiamtes over $\lambda$. Select $\lambda$ such that the stimates are stable with small $SSE(\lambda)$ and $VIF(\lambda)$s:
     * $SSE(\lambda) = (Y - X \hat \theta ^ * (\lambda))' (Y - X \hat \theta ^ * (\lambda))$
     * $VIF_j(\lambda) = ((X'X + \lambda I)^{-1} X' X (X' X + \lambda I) ^{-1})_{jj}$
   * Cross validation (CV) method: Find $\lambda$ minimizing the cross validation prediction error

 * Properties of the ridge estimator:
   * $E(\hat \theta ^ * (\lambda)) = (X' X + \lambda I)^{-1} X' X \theta$
   * $Cov(\hat \theta ^ * (\lambda)) = (X' X + \lambda I) ^{-1} X' X( X' X + \lambda I) ^{-1} \sigma^2$
   * $MSE(\lambda) = E[(\hat \theta ^ * (\lambda) - \theta) ' (\hat \theta ^ * (\lambda) - \theta)] \\\\ = \sigma^2 \sum_{j=1}^p \frac{\lambda_j}{(\lambda_j + \lambda)^2} + \lambda^2 \theta ' (X' X + \lambda I)^{-2} \theta \\\\ = Variance + (Bias)^2$

### 10.5 Least Absolute Shrinkage and Selection Operator (LASSO)
 * Tibshirani, R. (1996) Regression shrinkabge and selection via the lasso. Journal of the Royal Statistical Society Series B
 * $L^1$ regularization:
   * $(y - X \theta)' (y - X \theta) + \lambda \sum_{j=1}^p \| \theta_j \|$
   * Equivalently, minimize:
     * $(y - X \theta)'(y - X \theta) \text{ given } \sum_{j=1}^p \| \theta_j \| \le C$
 * As $\lambda$ gets large (equivalently, C gets small), some of estimates shrink to zero. => It can be used for variable or model selection
 * Easier interpretation than the ridge regression.
 * The tuning parameter $\lambda$ or C can be estimated by CV method.

## Chapter 11 Variable selections
### 11.1 Why do we need variable selections?
 * So far we assume that the predictors are predetermined to be included in our model.
 * In practice, we do not know which predictors should be included in the model.
 * We do not know the functional relationship as well
 * Selecting variables and the functional relationship must be simultaneously considered.

### 11.2 Effects of variable selections
 * We have a resposne Y and q predictors $X_1, \cdots, X_q$
 * The linear regression equation including all available predictors can be written as:
   * $y_i = \beta_0 + \sum_{j=1}^q \beta_j x_{ij} + \epsilon_i$
   * Let $\hat \beta_j ^ *$ be the LSE of the model including all available predictors.
 * We need to statistically decide which predictors should be retained in the model and which predictors should be removed from the model.
 * If we remove $X_{p+1}, \cdots , X_q$ from our model, then we have a smaller model:
   * $y_i = \beta_0 + \sum_{j=1}^p \beta_j x_{ij} + \epsilon_i$
   * Let $\hat \beta_j$ be the LSE of the model including p predictors by setting $\beta_{p+1} = \cdots = \beta_q = 0$
 * What happens if the full model is correct and we removed some predictors?:
   * $Var(\hat \beta_j ^ *) \ge Var(\hat \beta_j)$
   * $0 = Bias^2(\hat \beta_j ^*) \le Bias ^2(\hat \beta_j)$
   * $MSE(\hat \beta_j ^ *) = Var (\hat \beta_j ^ *) + bias ^2 (\hat \beta_j ^ *)$
   * Variance dec, Bias inc
   * This is called "Bias-Variance trade-off"
 * Conclusions:
   * Deleting variables may give us the smaller MSE esitmates than the unbiased LS estimates under the true model including all predictors.
   * Including extraneous variables results in loss of precision of the estimates.

### Appendix: Effects of Incorrect Model Specifications
  * $\hat \beta_p$ is a biased estimate of $\beta_p$ unless $\beta_r = 0$ or $X_p'X_r = 0$
  * $Cov(\hat \beta_p ^ *) - Cov(\hat \beta_p) \ge 0$, that is , variances of the least squares estimates of regression coefficients obtained from the full model are larger than the corresponding variances of the estimates obtained from the subset model. In other words, the deletion of variables always results in smaller variances for the estimates of the regression coefficients of the remaining variables.
  * If $Cov(\hat \beta_r ^ *) - \beta_r \beta_r ' \ge 0$, then $MSE (\hat \beta_p ^*) - MSE(\hat \beta_p) \ge 0$. This means that the least squares estimates of regression coefficients obtained from the subset model have smaller mean square error than estimates obtained fro mthe full model when the variables deleted have regression coefficients that are smaller than the standard deviation of the esitmates of the coefficients.
  * $\hat \sigma_p ^2$ is generally biased upward as an estimate of $\sigma^2$


### 11.3 Practical issues in variable selections
 * When a dataset with k predictors is collected, the number of all possible linear regression models equals $2^k$ => Exhaustive search may not be feasible in practice.
 * When we compare two or more models with the same number of predictors, we may use $R^2$ to select better model. What if the models do not have the same number of predictors ? => We need the statistical criteria for variable selections.

### 11.4 Forward, backward, stepwise selection
 * Classical approach based on the p-values in variable selections or model selections: sequentially include or remove a variable based on the p-value of the F test discussed in earlier chapters.:
   * What relationship between the probability that we select the true model and the level of significance? : No clear theoretical undertanding.
   * However, this approach is still widely used in many areas and most of statistical software provide this.
 * Suppose that we have k possible predictors: $X_1, \cdots, X_k$. Assume there is no serious multicollinearity between predictors.:

#### FS (Forward Selection)
 1. Preselect level of significance $\alpha_{in}$
 2. Start with the samllest model $y_i = \beta_0 + \epsilon_i$, denoted by $M_0$
 3. Find the model having the smallest p-value among k models: $y_i = \beta_0 + \beta_j x_{ij} + \epsilon$. If the p-value of the model is less than or equal to $\alpha_{in}$, then include the variable and the model is denoted by $M_1$. Otherwise, stop the procedure.
 4. Continue this procedure until there is no variable has the smaller p-value than $\alpha_in$ or it reaches the model including all variables.

#### BE (Backward Elimination)
 1. Predelect level of signifiance $\alpha_{out}$
 2. Start with the biggest model: $y_i = \beta_0 + \sum_{j=1}^k \beta_j x_{ij} + \epsilon_i$
 3. If the largest p-value of $X_j$ is greater than or equal to $\alpha_{out}$, then eliminate it.
 4. Refit the data with $k-1$ variables
 5. Continue the procedures until no predictor has larger p-value than $\alpha_{out}$ or it reaches $y_i = \beta_0 + \epsilon_i$

#### Stepwise selection
 1. Preselect $\alpha_{in}$ and $\alpha_{out}$
 2. At each step of the FS method, check whether a variable has the p-value greater than or equal to $\alpha_{out}$, if so, eliminate the variable.
 3. Continue these procedure until no variable has smaller p-value less than or equal to $\alpha_{in}$ and greater than or equal to $\alpha_{out}$ or it reaches the full model.

### 11.5 Best subset selection (regression)
 * For each number of predictors, select the best model based on the coefficient of determination $R^2$
 * We obtain k best models
 * If necessary, we select the best model among the k models based on one or some criteria.
 * It is an exhaustive search looking at all possible regression models
 * It cannot be used if the number of predictors k is too large.


### 11.6 Criteria
 * MSE(=RMS) : Mean Square Errors or Residual Mean Squares of a model with p parameters is defined by:
   * $MSE_p = \frac{SSE_p}{n-p}$
   * We select a model with smallest $MSE_p$
 * $R_{adj}^2$ = Adjusted $R^2$ is defined by:
   * $R_{adj, p}^2 = 1 - \frac{SSE_p / (n-p)}{SST/(n-1)} = 1 - \frac{MSE_p}{SST/(n-1)}$
   * Hence, maximizing $R_{adj,p}^2$ is equivalent to minimizing $MSE_p$
 * Mallows $C_p$ : Try to minimize the standardized total MSE of the prediction, that is,:
   * $\frac{\sum_{i=1}^n MSE_p(\hat y_i)}{\sigma^2} = \frac{\sum_{i=1}^n (\hat y - E y_i)^2}{\sigma^2}$
   * Mallows (1973) estimated it as:
     * $C_p = \frac{SSE_p}{\hat \sigma^2} + 2p - n$
     * where $\hat \sigma^2$ is the MSE of the model including all possible predictors. If the model with p predictors is correct, then $E(C_p) = p$.
   * In parctice,:
     * Select a model of which $C_p$ is close to p.
     * Usually, there are many models of which $C_p \approx p$, select the model with smallest $C_p$ as well.
     * Disadvantage: The estimate $\hat \sigma ^2$ affects $C_p$ and the variable selection based on $C_p$ may not be reliable.
 * PRESS: It is the predction sum of squares:
   * $PRESS_p = \sum_{i=1}^n (y_i - \hat y_{(i)})^2 = \sum_{i=1}^n (\frac{e_i}{1 - h_{ii}})^2$
   * where $\hat y_{(i)}$ is the predicted value of the ith observation based on the regression model with p variables excluding ith observation.
   * It is called a leav-on-out cross-validation (LOOCV)
   * For linear regression model, this statistic has a closed form, that is, it is very simple to calculate
 * AIC: Akaike information criterion (AIC) derivated this to correct the bias term of the log-likelihood function in very general situation.:
   * $AIC_p = -2 log (Likelihood) + 2p \\\\ = n log(\frac{SSE_p}{n}) + 2p$
   * AIC tends to overfit <=> AIC commonly selects a bigger model than the true model.
   * AIC or modified versions of AIC are widely used for the purpose of prediction <= Overfit is less problematic in prediction.
   * AIC is not consistent, that is, $lim_{n->\infty} P(\text{select a true model}) \not = 1$
 * BIC: Schwarz(1978) derived Bayesian information criterion (BIC) under Bayesian framework of the problem:
   * $BIC_p = -2 log (Likelihood) + plog n \\\\ = n log (\frac{SSE_p}{n}) + p log n$
   * BIC tends to select a smaller model than AIC <= BIC penalizes more than AIC for $log n \ge 2$
   * BIC is consistent, that is , $lim_{n->\infty} P(\text{select the true model}) = 1$ if the model space includes the true model. => It provides very nice theoretical justification ubt in practice we do not know our modelspace includes the true model.
   * BIC is commonly used when our model selection is the purpose of explanation and interpretation.
 * Cross-validation(CV): Recently, as the computer technology has been rapidly developed, this method is widely applied once the sample size is not so small.:
   * PRESS is a kind of the cross-validation methods.
   * Randonly partition the dataset into (usually) 5 or 10 almost equal sizes subsets.
   * For instance, suppose that we partition the dataset into 10 subsets. Use 9 subsets as the traning set to fit a model and estimate the prediction erros using the subset that is not used to fit the model.
   * We will have 10 fitted models and 10 estimates of the prediction erros. => Take average of the prediction erros.
   * For each model, we estimate the average of the prediction erros.
   * Choose the model having the smallest average prediction errors.

### 11.8 Variable selections with multicollinear data
 * We may eliminate some predictors to remove th multicollinearity
 * We may apply Ridge Regression:
   * Eliminate variables whose coefficients are stable but small. Since ridge regression is applied to standardized data, the magnitude of the various coefficients are directly comparable.
   * Eliminate variables with unstable coefficients that do not hold their predicting power, that is, untable coefficients that tend to zero.
   * Eliminate one or more variables with unstable coefficients. The variables remaining from the original set, say p in number, are used to form the regression equation.
 * We may apply LASSO with cross-validation (CV) method to determine the tuning parameter.
