import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { UserParent, UserChild } from '@prisma/client'
import { randomUUID } from 'crypto'
const utils = require('./utils')
const prisma = new PrismaClient()
// const prisma = new PrismaClient({log: ['query']})
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'info'



exports.get_userparent = async  (req: Request, res: Response) => {
  try {
    const user = res.locals.userparent
    const temp = {
      email: user.email,
      path: user.path
    }
    res.send(temp).status(200)
  } catch (e: any) {
    logger.info(`get_userparent : error = ${e}`)
  }
}

exports.post_userparent = async  (req: Request, res: Response) => {
  try {
    const { data } = req.body
    const { email, password } = data
    const info_search: UserParent|null = await prisma.userParent.findUnique({
      where: {
      email: String(email)
      }
    })

    if (info_search === null) {
      const info:UserParent|null = await prisma.userParent.create({
        data: {
          uuid: `${randomUUID()}`,
          path: `${randomUUID()}`,
          email: email,
          password: utils.hash(password),
        }
      })
      res.send('Account Created').status(200)  
    
    }else {
      throw new Error ('Account already exists.')
    }
  } catch (e: any){
    logger.info(`post_userparent : error = ${e}`)
  }
}

exports.patch_userparent = async (req: Request, res: Response) => {
  try {
    const user = res.locals.userparent
    const { data } = req.body
    const { email, password } = data
    
    const info_update: UserParent | null = await prisma.userParent.update({
      where: {
        email: user.email
      },
      data: {
        email: email, 
        password: utils.hash(password)
      }
    })
    logger.info(info_update)
    res.send('Account Updated').status(200)
  } catch (e: any){
    logger.info(`patch_userparent : error = ${e}`)
  }
}

exports.delete_userparent = async (req: Request, res: Response) => {
  try {
    const user = res.locals.userparent
    const info_delete: UserParent | null = await prisma.userParent.delete({
      where: {
        email: user.email
      }
    })
    logger.info(info_delete)
    res.send('Account Deleted').status(200)
  } catch (e: any){
    logger.info(`delete_userparent : error = ${e}`)
  }
}


exports.get_userchild_parent = async  (req: Request, res: Response) => {
  try {
    const user = res.locals.userparent
    const { id_child } = req.query
    let ret;
    if (id_child === undefined){
      const ret = user.children.map((v: UserChild) => {
        return {
          name: v.name,
          email: v.email,
        }
      })
    } else {
      const ret = user.children
        .filter((v: UserChild) => {
          return v.uuid === id_child
        })
        .map((v: UserChild) => {
          return {
            name: v.name,
            email: v.email,
          }
        })
    }
    res.send(ret).status(200)
    
  } catch (e: any) {
    logger.info(`get_userparent : error = ${e}`)
  }
}


exports.post_userchild_parent = async  (req: Request, res: Response) => {
  try {

    const user = res.locals.userparent
    const { data } = req.body
    const { name, email, password } = data
    
    const info_search: UserChild|null = await prisma.userChild.findUnique({
      where: {
      email: String(email)
      }
    })
    if (info_search === null) {
      const info:UserChild|null = await prisma.userChild.create({
        data: {
          uuid: `${randomUUID()}`,
          name: name,
          email: email,
          password: utils.hash(password),
          UserParent: user,
          userParentId: user.id
        }
      })
      res.send('Account Created').status(200)
    
    }else {
      throw new Error ('Account already exists.')
    }
  } catch (e: any){
    logger.info(`post_userparent : error = ${e}`)
  }
}

exports.patch_userchild_parent = async (req: Request, res: Response) => {
  try {
    const user = res.locals.userparent
    const { data } = req.body
    const { name, email, password } = data
    
    const info_update: UserChild | null = await prisma.userChild.update({
      where: {
        email: email
      },
      data: {
        name: name,
        email: email, 
        password: utils.hash(password)
      }
    })
    logger.info(info_update)
    res.send('Account Updated').status(200)  
  } catch (e: any){
    logger.info(`patch_userparent : error = ${e}`)
  }
}

exports.delete_userchild_parent = async (req: Request, res: Response) => {
  try {
    const user = res.locals.userparent
    const { data } = req.body
    const { email } = data
    const info_delete: UserChild | null = await prisma.userChild.delete({
      where: {
        email: email
      }
    })
    logger.info(info_delete)
    res.send('Account Deleted').status(200)  
  } catch (e: any){
    logger.info(`delete_userparent : error = ${e}`)
  }
}
