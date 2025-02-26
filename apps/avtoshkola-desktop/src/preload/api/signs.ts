import { signs } from 'avtoshkola-pdd'

export default {
  getSygnTypes: async () => signs.getSygnTypes(),
  getSigns: async (type: string) => signs.getSigns(type),
  getSign: async (type: string, number: string) => signs.getSign(type, number)
}
