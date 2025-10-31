module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.15.1"

  cluster_name                   = local.name
  cluster_endpoint_public_access = true

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.public_subnets         # Node groups in private subnets
  control_plane_subnet_ids = module.vpc.intra_subnets           # Control plane in intra subnets

  cluster_addons = {
    coredns   = { most_recent = true }
    kube-proxy = { most_recent = true }
    vpc-cni    = { most_recent = true }
  }

 

  eks_managed_node_groups = {
    arnab_eks_node- = {
      min_size     = 1
      max_size     = 2
      desired_size = 2

      # Use t2.large or GPU instance if needed
      instance_types = ["t2.large"]
      # instance_types = ["g4dn.xlarge"]  # Uncomment if GPU needed

      capacity_type = "SPOT"

      disk_size                 = 35
      use_custom_launch_template = false

      additional_security_group_ids = [aws_security_group.allow_user_to_connect.id]

      tags = {
        Name        = "arnab_eks_nodes "
        Environment = "dev"
        ExtraTag    = "e_commerce_app"
      }
    }
  }

  tags = local.tags
}

##########################
# Fetch running EKS nodes (optional)
##########################
data "aws_instances" "eks_nodes" {
  instance_tags = {
    "eks:cluster-name" = module.eks.cluster_name
  }

  filter {
    name   = "instance-state-name"
    values = ["running"]
  }

  depends_on = [module.eks]
}
