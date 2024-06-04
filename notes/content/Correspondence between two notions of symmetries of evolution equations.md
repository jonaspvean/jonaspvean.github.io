---
title: Correspondence between two notions of symmetries of evolution equations
tags:
  - symmetries
---
Consider the evolution equation given by
$$u_t = K$$
where $u = (u^1,\ldots,u^q)$ are the dependent functions and $K = (K^1[u],\ldots,K^q[u])$ may depend on the partial derivatives $u_{J}^\alpha= \partial_{J}u^\alpha$ and $x= (x^1,\ldots,x^p)$, but is independent in time. In Rosencrans [CITE] the following symmetry definition is used:

A symmetry of the evolution equation $u_{t}= K$ is another equation $u_{s}= P$ such that 
$$
D_{t}P = D_{s}K
$$
which is the necessary and sufficient condition for $u$ to be a simultaneous solution for both systems. 

From Olver [CITE], the condition for $\mathbf{v}_P$ being a symmetry is 
$$
\frac{\partial \mathbf{v}_P}{\partial t} + [\mathbf{v}_{P}, \mathbf{v}_{K}] = 0
$$
where $\mathbf{v}_K$ is the evolutionary vector field associated with $K$:
$$
\mathbf{v}_{K}= \sum\limits_{\alpha = 1}^{q}K^\alpha[u]\frac{\partial}{\partial u^\alpha}
$$
likewise for $\mathbf{v}_P$.


We shall see how these two different formalisms are linked. 

Starting from Rosencrans' formalism, let $\mathbf{v}_P$ denote the evolutionary vector field associated with $P$. Then 
$$
D_{t}P = \frac{\partial P}{\partial t} + \sum\limits_{\alpha, J}\frac{\partial P}{\partial u^{\alpha}_J}\frac{\partial u^{\alpha}_J}{\partial t} = \frac{\partial P}{\partial t} + \sum\limits_{\alpha, J}\frac{\partial P}{\partial u^{\alpha}_J}\partial_{J}K^{\alpha} 
$$
and similarly, noting that $K$ is independent of $s$,
$$
D_{s}K = \frac{\partial K}{\partial s} + \sum\limits_{\alpha, J}\frac{\partial K}{\partial u^{\alpha}_J}\frac{\partial u^{\alpha}_J}{\partial s} = \sum\limits_{\alpha, J}\frac{\partial K}{\partial u^{\alpha}_J}\partial_{J}P^{\alpha}.
$$

Since $D_{t}P = D_{s}K$ we then obtain
$$
\frac{\partial P}{\partial t} = \sum\limits_{\alpha, J}\frac{\partial K}{\partial u^{\alpha}_J}\partial_{J}P^{\alpha} - \sum\limits_{\alpha, J}\frac{\partial P}{\partial u^{\alpha}_J}\partial_{J}K^{\alpha}. \tag{1}
$$

^b8e2d8

Rosencrans' article actually has a vectorialization of $q$-tupled functions $P = (P^1,\ldots,P^q)$ which associates an operator $V(P)$ to $P$ through
$$
V(P) = \sum\limits_{J}\partial_{J}P\cdot \partial_{J} = \sum\limits_{\alpha,J} \partial_{J} P^{\alpha} \cdot \partial^{\alpha}_{J}.
$$
Using this vectorialization, Equation[[#^b8e2d8 | (1) ]] then reads
$$
\frac{\partial P}{\partial t} = V(P) K - V(K)P.
\tag{2}
$$

^66d6ef

Now, $P$ is a $q$-tuple with components $P^\alpha$, hence it is also identifiable with its evolutionary vector field $\mathbf{v}_P$. We can think of this identification as expanding $P$ over the basis $\{\partial_{u^\alpha}\}$. Equation [[#^66d6ef | (2) ]] finally becomes the desired symmetry notion from Olver's text:
$$
\frac{\partial \mathbf{v}_P}{\partial t} + [\mathbf{v}_{P}, \mathbf{v}_{K}] = 0
$$
since one can do the aforementioned identification on the summands involving the partials of $K$ and $P$ as well. 

